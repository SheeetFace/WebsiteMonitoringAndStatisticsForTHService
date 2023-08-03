
export const getCurrentDate = ():string=>{

    const now = new Date;
    
    return now.toLocaleString('be-BY', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
}