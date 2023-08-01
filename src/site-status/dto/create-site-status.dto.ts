import { IsNotEmpty } from 'class-validator';

export class CreateSiteStatusDto {
    // URL: string;
    // projectID: string;
    // webHook: string;
    // statistic: [];
    
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
