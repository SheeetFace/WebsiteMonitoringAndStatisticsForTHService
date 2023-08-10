import { SiteStatusController } from "src/site-status/site-status.controller"
import { checkWebsite } from "src/utils/website-checker.util"
import { getCurrentDate } from "src/utils/date.util"
import { discordNotifier } from "./discord/discord-notifier"

interface Item{
    id: number,
    URL: string,
    projectID: string,
    webHook: string,
    statistics:ItemStatus[]
}
interface ItemStatus{
    date:string,
    status:boolean
}

export const startObservation =(siteStatusService: any) => {

    console.log('-----------------------------------------------------------------------')
    console.log('-------------------STARTING OBSERVATION--------------------------------')
    console.log('-----------------------------------------------------------------------')
  
    const siteStatusController = new SiteStatusController(siteStatusService);
    const findAllFunction = siteStatusController.findAll.bind(siteStatusController);
    const addDifferentStatus =siteStatusController.addStatistic.bind(siteStatusController);

  
    setInterval(()=> {
        chekingAll()
    // }, 900000);
    }, 30000);

    const chekingAll = async()=>{
      console.log('chekingAll')
        const res = await findAllFunction() 

        const totalItems = res.length
        let checkedItems = 0
          
        if(res){      
          res.reduce(async (promise, item:Item)=>{
            await promise   
            checkOne(item).then(()=>{
              checkedItems++ 
              if(checkedItems === totalItems){
                console.log(`Проверено ${checkedItems} из ${totalItems}`);    
                return 
              }
            })      
            return
          }, Promise.resolve())
        }else{
          console.error('Не могу получить res от findAllFunction в startObservation')  
        }
      }

    const checkOne =async(item:Item)=>{
        const siteStatus = await checkWebsite(item.URL)
        console.log(item)
        if(siteStatus.status !== item.statistics[item.statistics.length-1].status){
            console.log(`НЕ СОВПАДАЕТ ${item.id}`)

            const now = getCurrentDate()

            const data = await addDifferentStatus(item.projectID,{date:now,status:siteStatus.status})

            discordNotifier("OBSERVER",siteStatus,now,data.webHook,data.URL)

        }else{
            console.log(`всё норм для ${item.id}`)
        }
    }

  }

