import { Controller, Get, Post, Body, Patch, Param, Delete,Req } from '@nestjs/common';
import { SiteStatusService } from './site-status.service';
import { CreateSiteStatusDto } from './dto/create-site-status.dto';

@Controller('site-status')
export class SiteStatusController {
  constructor(private readonly siteStatusService: SiteStatusService) {}

  @Post()
  create(@Body() createSiteStatusDto: CreateSiteStatusDto) {
    return this.siteStatusService.create(createSiteStatusDto);
  }

  @Get()
  async findAll() {
    return await this.siteStatusService.findAll();
  }

  @Get('/getItem:projectID')
  async findOne(@Param('projectID') projectID: string,) {
    return this.siteStatusService.findOne(projectID);
  }

  // @Get('/checkSiteStatus:URL')
  // async checkSiteStatus(@Param('URL') URL: string,) {
  //   return this.siteStatusService.checkSiteStatus(URL);
  // }
  @Post('/checkSiteStatus')
  async checkSiteStatus( @Body() body:{ url: string}) {
    return this.siteStatusService.checkSiteStatus(body.url);
  }

  @Patch('/changeData:projectID')
  async changeData(@Param('projectID') projectID: string, @Body() newData:{webHook:string, URL:string}){
    return await this.siteStatusService.changeData(projectID, newData);
  }

  @Patch('/addStatistics:projectID')
  async addStatistic(@Param('projectID') projectID: string, @Body() newStatisticItem:{date:string,status:boolean}){
    return await this.siteStatusService.addStatistic(projectID, newStatisticItem);
  }

  @Delete('/remove:projectID')
  remove(@Param('projectID') projectID: string) {
    return this.siteStatusService.remove(projectID);
  }

  @Get('/databaseSize')
  async getDatabaseSize() {
    return this.siteStatusService.getDatabaseSize();
  }
}
