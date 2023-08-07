interface Status{
    status:boolean,
    isError?:string
}

export const webHookOBSERVER = (status:Status,date:string,URL:string)=>{

    const template = {
        "embeds": [
            {
                "author": {
                    "name": status.status ? "😀 ФУХ, ВСЁ ЗАРАБОТАЛО 😀" : "🚨 О НЕТ,САЙТ УПАЛ 🚨",
                },
                "title": status.status ? '' : `${status.isError}`,
                "description": `${URL}`,
                "color": status.status ? 65280 : 16711680,
                "fields": [
                    {
                        "name": "**:alarm_clock: ВРЕМЯ**",
                        "value": date
                    },
                    // {
                    //     "name": status.status ? "**:green_square: время проверки**":"**:red_square: время проверки**",
                    //     "value": date
                    // },
                    // ...(status.isError ? [{
                    //     "name": "**:red_square: ОШИБКА**",
                    //     "value": status.isError
                    // }] : [])

                ],
            }
        ]
    };


    return template;
}