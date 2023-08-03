import { SiteStatusController } from "src/site-status/site-status.controller"

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
  
    setInterval(()=> {
        chekingAll()
    }, 10000);


    const chekingAll = async () => {
        const res = await findAllFunction()
        
        if(res){
            res.reduce(async(promise, item:Item)=> {
                await promise;
                return checkOne(item)
              }, Promise.resolve())
        }else{
            console.error('Не могу получить res от findAllFunction в startObservation')
        }

      }

    const checkOne =async(item:Item)=>{
        console.log(item)
        //берем каждый итем с ссылкой на сайт и првоеряем его
        //далее сравниваем полученнй результат с последним обьектом 
        //из статистики
        //если статусы совпадаюст, то ничего не делаем
        //если отличаются, то пишем в дикорд и записываем лог в базу данных

    }

  }

