import { Injectable } from '@nestjs/common';
import { CreateSiteStatusDto } from './dto/create-site-status.dto';
import { UpdateSiteStatusDto } from './dto/update-site-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SiteStatus } from './entities/site-status.entity';
import { Repository } from 'typeorm';

import { getCurrentDate } from 'src/utils/date.util';
import { checkWebsite } from 'src/utils/website-checker.util';

import { discordNotifier } from 'src/services/discord/discord-notifier';
// import { DiscordType } from 'src/types/discordTypes';

@Injectable()
export class SiteStatusService {
  constructor(
    @InjectRepository(SiteStatus)
    private readonly categoryRepository: Repository<SiteStatus>
  ){}

  async create(createSiteStatusDto: CreateSiteStatusDto) {

    const status =await checkWebsite(createSiteStatusDto.URL)

    const now = getCurrentDate()

    const firstStatistic = {
      "date": now,
      "status": status.status
    }
    console.log(createSiteStatusDto,status )
    if(createSiteStatusDto.webHook){
      //вызывать из сервисов дискорд нотифиер
      discordNotifier('INIT',status,now,createSiteStatusDto.webHook,createSiteStatusDto.URL)
    }


  
    const siteStatus = new SiteStatus();
      siteStatus.URL = createSiteStatusDto.URL;
      siteStatus.projectID = createSiteStatusDto.projectID;
      siteStatus.webHook = createSiteStatusDto.webHook;
      siteStatus.statistics = [firstStatistic];
    
      return await this.categoryRepository.save(siteStatus);
  }

  async findAll() {
    return await this.categoryRepository.find(); 
  }

  async findOne(projectID: string) {
    const strProjectID =projectID.replace(":", "")
    return await this.categoryRepository.find({where: {projectID: strProjectID}}); 
  }

  // update(id: number, updateSiteStatusDto: UpdateSiteStatusDto) {
  //   return `This action updates a #${id} siteStatus12312`;
  // }

  async changeWebHook(projectID: string, newWebHook: string){

    const strProjectID =projectID.replace(":", "")
    const siteStatus = await this.categoryRepository.findOne({where: {projectID: strProjectID}});
    if(!siteStatus){
      throw new Error('SiteStatus not found');
    }

    siteStatus.webHook = newWebHook;
    return await this.categoryRepository.save(siteStatus);
  }

  async changeURL(projectID: string, newURL: string){
    console.log(typeof newURL)
    const strProjectID =projectID.replace(":", "")
    const siteStatus = await this.categoryRepository.findOne({where: {projectID: strProjectID}});
    if(!siteStatus){
      throw new Error('SiteStatus not found');
    }

    siteStatus.URL = newURL;
    return await this.categoryRepository.save(siteStatus);
  }

  async addStatistic(projectID: string, newStatisticItem: { date: string, status: boolean }) {

    const strProjectID =projectID.replace(":", "")
    const siteStatus = await this.categoryRepository.findOne({where: {projectID: strProjectID}});

    if(!siteStatus){
      throw new Error('SiteStatus not found');
    }
  
    if(!siteStatus.statistics){
      siteStatus.statistics = [];
    }
  
    siteStatus.statistics.push(newStatisticItem);
    
    return await this.categoryRepository.save(siteStatus);
  }

  async remove(projectID: string) {

    const strProjectID = projectID.replace(":", "");

    const siteStatus = await this.categoryRepository.findOne({
      where: { projectID: strProjectID } 
    });
  
    if (!siteStatus) {
      console.error('projectID not found');
      return {status:false,
              isError:'projectID not found'}
    }
  
    await this.categoryRepository.delete({
      projectID: strProjectID  
    });
  
    return {status:true,
          isError:''}
  }
}