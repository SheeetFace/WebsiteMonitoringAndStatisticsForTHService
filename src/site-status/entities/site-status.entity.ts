//это таблица в базе данных

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SiteStatus {
    @PrimaryGeneratedColumn() //auto genereting id
    id:number;

    @Column()
    URL:string;

    @Column()
    projectID:string;
    
    @Column()
    webHook:string;

    @Column({ type: 'json', nullable: true })
    statistics: {
        date:string,
        status:boolean
    }[]

}
