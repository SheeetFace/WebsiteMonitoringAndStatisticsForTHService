import fetch from 'node-fetch';

interface Response{
    status:boolean,
    isError?:string
}

export const checkWebsite = async(url:string):Promise<Response>=>{
    try{
        const response = await fetch(url, {throwHttpErrors: true});
        
        // console.log(response)
        if(response.status === 200){
          return { status:true}
        }

      }catch(error){
        console.error(`💀 ОШИБКА ПОЛУЧЕНИЯ ДАННЫХ ПРИ ПРОВЕРКЕ СТАТУСА САЙТА(${url} ${error})💀`)
        return {status:false,
                isError:error.message}
      }
    
}

