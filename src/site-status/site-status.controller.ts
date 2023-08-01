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
  async findAll(@Req() req) {
    // return this.siteStatusService.findAll();
    const data = await this.siteStatusService.findAll();
    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.siteStatusService.findOne(+id); //! почему в чсило превращаем id?
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSiteStatusDto: UpdateSiteStatusDto) {
  //   return this.siteStatusService.update(+id, updateSiteStatusDto);
  // }

  @Patch('/statistics:projectID')
async addStatistic(@Param('projectID') projectID: string, @Body() newStatisticItem: { date: string, status: boolean }) {
  return await this.siteStatusService.addStatistic(projectID, newStatisticItem);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteStatusService.remove(+id);
  }
}
