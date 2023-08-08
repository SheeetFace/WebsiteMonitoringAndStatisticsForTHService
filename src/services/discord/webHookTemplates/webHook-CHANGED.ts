

export const webHookCHANGED = (message:string)=>{

    const template = {
        "embeds": [
            {
                "author": {
                    "name": "🎉ОТЛИЧНО🎉",
                },
                "title": message,
                "color": 65280,
                "image": {
                    "url": "https://cdn.discordapp.com/attachments/872343092500504628/1138391555036680272/image.png"
                  }
            }
        ]
    };

    return template;
}