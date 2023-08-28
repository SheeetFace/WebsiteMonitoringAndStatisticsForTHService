import { Injectable } from '@nestjs/common';
import { CreateSiteStatusDto } from './dto/create-site-status.dto';
import { UpdateSiteStatusDto } from './dto/update-site-status.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { SiteStatus } from './entities/site-status.entity';
import { Repository } from 'typeorm';

import { getCurrentDate } from 'src/utils/date.util';
import { checkWebsite } from 'src/utils/website-checker.util';

import { discordNotifier } from 'src/services/discord/discord-notifier';


interface Temporary{
  oldURL?:string,
  oldWebHook?:string
}


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
    const data = await this.categoryRepository.find({where: {projectID: strProjectID}})

    if(!data || !data.length){
      console.error('Project not found by projectID in findOne')
    }
    
    const item = data[0]
    
    if(!item.URL){
      console.error('URL not defined in item = data[0] in findOne')
    }

    const lastStatus =await checkWebsite(data[0].URL)
    
    const statusNow = {
      "date": getCurrentDate(),
      "status": lastStatus.status
    }

    data[0].statistics.push(statusNow)

    return data
  }

  async checkSiteStatus(URL: string) {
    // const replacedURL =URL.replace(":", "")
    // console.log(replacedURL )
    // const data = await this.categoryRepository.find({where: {projectID: strProjectID}});

    // if(!data || !data.length){
    //   console.error('Project not found by projectID in checkSiteStatus')
    // }
    
    // const item = data[0]
    if(!URL){
      console.error('URL not defined')
    }
    
    const status = await checkWebsite(URL)

    return {status:status.status}
  }

  async changeData(projectID: string, newData:{webHook:string, URL:string}){
    const strProjectID =projectID.replace(":", "")
    const siteStatus = await this.categoryRepository.findOne({where: {projectID: strProjectID}});

    let temporary:Temporary
    let message:string

    if(!siteStatus){
      throw new Error('SiteStatus not found');
    }

    if(siteStatus.URL !== newData.URL && siteStatus.webHook === newData.webHook){
      temporary={oldURL:siteStatus.URL}
      siteStatus.URL = newData.URL
      console.log('URL CHANGED')
      message=`ты изменил ${temporary.oldURL} на ${newData.URL}`


    }else if(siteStatus.webHook !== newData.webHook && siteStatus.URL === newData.URL){
      temporary={oldWebHook:siteStatus.webHook}
      siteStatus.webHook = newData.webHook
      console.log('WEBHOOK CHANGED')
      message=`ты изменил вебхук`

    }else{
      temporary={oldURL:siteStatus.URL,
                oldWebHook:siteStatus.webHook}

      siteStatus.URL = newData.URL
      siteStatus.webHook = newData.webHook
      console.log('URL/WEBHOOK CHANGED')
      message=`ты изменил вебхук, а также ${temporary.oldURL} на ${newData.URL}`

    }

    if(newData.webHook){
      discordNotifier("CHANGED",{status:true},'',newData.webHook,'',message)
    }

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

    const [result] = await this.categoryRepository.query(
      `SELECT   
         pg_database_size($1) AS totalSize,
         pg_size_pretty(pg_database_size(current_database())) AS usedSize`,  
         [dbName]  
    );
    return result
  }
}
