import { Module } from '@nestjs/common';
import { SiteStatusService } from './site-status.service';
import { SiteStatusController } from './site-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { SiteStatus } from './entities/site-status.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SiteStatus])],
  controllers: [SiteStatusController],
  providers: [SiteStatusService],
})
export class SiteStatusModule {}
