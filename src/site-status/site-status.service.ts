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

    if(createSiteStatusDto.webHook && status){
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

  async getDatabaseSize(): Promise<{totalSize:string,usedSize:string}>{
    const dbName = process.env.DB_NAME;
    // const [result] = await this.categoryRepository.query(
    //   `SELECT   
    //       pg_database_size('defaultdb') AS totalSize,
    //       pg_size_pretty(pg_database_size(current_database())) AS usedSize`  
    // )
    const [result] = await this.categoryRepository.query(
      `SELECT   
         pg_database_size($1) AS totalSize,
         pg_size_pretty(pg_database_size(current_database())) AS used_size`,  
         [dbName]  
    );
    return result
  }
}
