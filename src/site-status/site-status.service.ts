import { Injectable } from '@nestjs/common';
import { CreateSiteStatusDto } from './dto/create-site-status.dto';
import { UpdateSiteStatusDto } from './dto/update-site-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SiteStatus } from './entities/site-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SiteStatusService {
  constructor(
    @InjectRepository(SiteStatus)
    private readonly categoryRepository: Repository<SiteStatus>
  ){}

  async create(createSiteStatusDto: CreateSiteStatusDto) {
    const siteStatus = new SiteStatus();
      siteStatus.URL = createSiteStatusDto.URL;
      siteStatus.projectID = createSiteStatusDto.projectID;
      siteStatus.webHook = createSiteStatusDto.webHook;
      siteStatus.statistics = createSiteStatusDto.statistics;
    
      return await this.categoryRepository.save(siteStatus);


    // console.log(createSiteStatusDto.projectID)
    // console.log(`This action adds a new siteStatus ${JSON.stringify(createSiteStatusDto)}`)
    // return `This action adds a new siteStatus ${createSiteStatusDto}`;
  }

  // async create(createSiteStatusDto: CreateSiteStatusDto) {
  //   const siteStatus = new SiteStatus();
  //   siteStatus.URL = createSiteStatusDto.URL;
  //   siteStatus.projectID = createSiteStatusDto.projectID;
  //   siteStatus.webHook = createSiteStatusDto.webHook;
  //   siteStatus.statistics = createSiteStatusDto.statistics;
  
  //   return await this.categoryRepository.save(siteStatus);
  //   console.log( await createSiteStatusDto)
  // }

  async findAll() {
    return await this.categoryRepository.find(); 
  }

  findOne(id: number) {
    return `This action returns a #${id} siteStatus`;
  }

  update(id: number, updateSiteStatusDto: UpdateSiteStatusDto) {
    return `This action updates a #${id} siteStatus12312`;
  }

  // updateURL(id: number, updateURLDto: UpdateURLDto) {
  //   return `This action updates a #${id} siteStatusURL`;
  // }
  // updateWebHook(id: number, updateWebHookDto: UpdateWebHookDto) {
  //   return `This action updates a #${id} siteStatus`;
  // }

  async addStatistic(projectID: string, newStatisticItem: { date: string, status: boolean }) {

    const strProjectID =projectID.replace(":", "")
    console.log(strProjectID,newStatisticItem)
    const siteStatus = await this.categoryRepository.findOne({where: {projectID: strProjectID}});
    if (!siteStatus) {
      throw new Error('SiteStatus not found');
    }else{
      console.log(siteStatus)
    }
  
    if (!siteStatus.statistics) {
      siteStatus.statistics = [];
    }
  
    siteStatus.statistics.push(newStatisticItem);
    
    return await this.categoryRepository.save(siteStatus);
  }

  remove(id: number) {
    return `This action removes a #${id} siteStatus`;
  }
}
