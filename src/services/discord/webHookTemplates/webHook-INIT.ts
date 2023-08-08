interface Status{
    status:boolean,
    isError?:string
}

export const webHookINIT = (status:Status,date:string,URL:string)=>{

    const template = {
        "embeds": [
            {
                "author": {
                    "name": status.status ? "🎉ОТЛИЧНО🎉" : "😭 О НЕТ 😭",
                },
                "title": status.status ? `**Теперь сайт отслеживается**` : `**Теперь сайт отслеживается, но**`,
                "description": `${URL}`,
                "color": status.status ? 65280 : 16711680,
                "fields": [
                    {
                        "name": status.status ? "**:green_square: СТАТУС**":"**:red_square: СТАТУС**",
                        "value": String(status.status)
                    },
                    {
                        "name": status.status ? "**:green_square: время проверки**":"**:red_square: время проверки**",
                        "value": date
                    },
                    ...(status.isError ? [{
                        "name": "**:red_square: ОШИБКА**",
                        "value": status.isError
                    }] : [])

                ],
                // "thumbnail": {
                //     "url": status.status ? "https://cdn.7tv.app/emote/61bb2f9b05f36322ee1a801f/2x.webp":"https://cdn.7tv.app/emote/60b79884f09ea88072653d4b/2x.webp"
                // },
                // "footer": {
                //     "icon_url": "https://cdn.discordapp.com/attachments/872343092500504628/1123179048277921832/image.png"
                // }
                "image": {
                    "url": "https://cdn.discordapp.com/attachments/872343092500504628/1138391555036680272/image.png"
                  }
            }
        ]
    };


    return template;
}