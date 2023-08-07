import fetch from 'node-fetch';
import { webHookINIT } from './webHookTemplates/webHook-INIT';
import { webHookOBSERVER } from './webHookTemplates/webHook-OBSERVER';


import { DiscordType } from "src/types/discordTypes"


interface Status{
    status:boolean,
    isError?:string
}

export const discordNotifier=async(type:DiscordType,status:Status,date:string,webHook:string,URL:string)=>{

    const chooseTemplate = (type:DiscordType)=>{
        switch(type){
            case "INIT":
                return webHookINIT(status,date,URL)
                // break
    
            case "CHANGED":
    
                break
    
            case "OBSERVER":
                return webHookOBSERVER(status,date,URL)
                // break
        }
    }

    const body = chooseTemplate(type)

    try {
      const response = await fetch(webHook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return response.status === 204;
    } catch (error) {
      console.error("Discord webhook error: ", error);
      return false;
    }

}