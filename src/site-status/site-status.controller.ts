import { Controller, Get, Post, Body, Patch, Param, Delete,Req } from '@nestjs/common';
import { SiteStatusService } from './site-status.service';
import { CreateSiteStatusDto } from './dto/create-site-status.dto';
import { UpdateSiteStatusDto } from './dto/update-site-status.dto';

@Controller('site-status')
export class SiteStatusController {
  constructor(private readonly siteStatusService: SiteStatusService) {}

  @Post()
  create(@Body() createSiteStatusDto: CreateSiteStatusDto) {
    return this.siteStatusService.create(createSiteStatusDto);
  }

  @Get()
  async findAll() {
    // return this.siteStatusService.findAll();
    return await this.siteStatusService.findAll();
  }

  @Get('/getItem:projectID')
  async findOne(@Param('projectID') projectID: string,) {
    return this.siteStatusService.findOne(projectID);
  }
  
  @Patch('/changeWebHook:projectID')
  async changeWebHook(@Param('projectID') projectID: string, @Body('newWebHook') newWebHook: string) {
    return await this.siteStatusService.changeWebHook(projectID, newWebHook);
  }

  @Patch('/changeURL:projectID')
  async changeURL(@Param('projectID') projectID: string, @Body('newURL') newURL: string) {
    return await this.siteStatusService.changeURL(projectID, newURL);
  }

  @Patch('/addStatistics:projectID')
  async addStatistic(@Param('projectID') projectID: string, @Body() newStatisticItem: { date: string, status: boolean }) {
    return await this.siteStatusService.addStatistic(projectID, newStatisticItem);
  }

  @Delete('/remove:projectID')
  remove(@Param('projectID') projectID: string) {
    return this.siteStatusService.remove(projectID);
  }
}
