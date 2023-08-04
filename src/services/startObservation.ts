import { SiteStatusController } from "src/site-status/site-status.controller"
import { checkWebsite } from "src/utils/website-checker.util"
import { getCurrentDate } from "src/utils/date.util"

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
    // }, 60000);
    }, 30000);

    const chekingAll = async()=>{
        const res = await findAllFunction() 
        const totalItems = res.length;
        let checkedItems = 0;
          
        if(res){      
          res.reduce(async (promise, item:Item)=>{
            await promise   
            checkOne(item).then(()=>{
              checkedItems++;  
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

        if(siteStatus.status !== item.statistics[item.statistics.length-1].status){
            // console.log(siteStatus)
            console.log(`НЕ СОВПАДАЕТ ${item.id}`)
            //!сначало в базу записываем
            //! потом выписываем ошибку
            addDifferentStatus(
                item.projectID,  
                { 
                  date: getCurrentDate(),
                  status: siteStatus.status
                }      
              );
        }else{
            console.log(`всё норм для ${item.id}`)
        }
    }

  }

