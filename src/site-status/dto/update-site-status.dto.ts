import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteStatusDto } from './create-site-status.dto';

export class UpdateSiteStatusDto extends PartialType(CreateSiteStatusDto) {}
