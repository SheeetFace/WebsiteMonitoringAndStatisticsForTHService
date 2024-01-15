import fetch from 'node-fetch';

interface Response{
    status:boolean,
    isError?:string
}

export const checkWebsite = async(url:string):Promise<Response>=>{
    try{
        const response = await fetch(url, {throwHttpErrors: true});

        if(response.status === 200){
          return { status:true}
        }
        
        if(response.status >= 400){
          if(response.statusText === "Forbidden"){
            console.error("Forbidden but...")
            return { status:true}
          }
          console.error(`💀 ОШИБКА ПОЛУЧЕНИЯ ДАННЫХ ПРИ ПРОВЕРКЕ СТАТУСА САЙТА(${url} ${response.statusText})💀`)
          return {status:false, 
                  isError: response.statusText }
        }
 
      return {status:false}    

      }catch(error){
        //! console.error(`💀 ОШИБКА ПОЛУЧЕНИЯ ДАННЫХ ПРИ ПРОВЕРКЕ СТАТУСА САЙТА(${url} ${error})💀`)
        return {status:false,
                isError:error.message}
      }
    
}

