import { IsNotEmpty } from 'class-validator';

export class CreateSiteStatusDto {

  @IsNotEmpty()
  URL: string;

  @IsNotEmpty() 
  projectID: string;

  @IsNotEmpty()
  webHook: string;

  @IsNotEmpty()
  statistics: [{
    date: string;
    status: boolean;
  }]; 
}
