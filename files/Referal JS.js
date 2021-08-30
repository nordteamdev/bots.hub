const { VK, Keyboard, MessageContext } = require('vk-io')
const vk = new VK()
const user = new VK()

const { updates } = vk;

const fs = require("fs");
const request = require('prequest');
const QuestionManager = require('vk-io-question');
const questionManager = new QuestionManager();
const fetch = require('node-fetch');
const child = require("child_process");
const colors = require('colors')

// const chalk         = require('chalk');
const chalkAnimation = require('chalk-animation');




let cfg = require('./db/cfg.json')
let vksubs = 0;

user.setOptions({
    token: cfg.vka
})
vk.setOptions({
    token: cfg.vkt,
    apiMode: 'parallel',
    pollingGroupId: cfg.vkg
})


let st = updates;




async function run () {
    updates.startPolling(console.log(`Бот включён! :) \n@club${cfg.vkg}`.blue.bold));
}

run().catch((err) => {console.log(err)})

let users = require('./db/user.json')
let s = require('./db/s.js')



st.on(['new_message'], async (ctx,next) => {
    const { messagePayload } = ctx;


    ctx.state.command = messagePayload && messagePayload.command
            ? messagePayload.command
            : null;



if(ctx.senderId <= 0) return;

    if(Number(ctx.senderId) <= 0) return;
    if(!users.find(x=> x.id === ctx.senderId))
    {
        vk.api.call('users.get', { 
            user_id: ctx.senderId, 
            fields: "first_name,last_name,id,domain" 
        }).then((press_F_to_respect) => {
            users.push({
                user_id: ctx.senderId,
                id: users.length + 1,
                name: `${press_F_to_respect.first_name}`,
                bal: 0,
                ref: {
                    fff: false,
                    id: 0,
                    count: 0,
                    name_user: ``,
                    ref_url: ``
                }
            })
        })
    }

    if(ctx.referralValue){
        let i = users.find(x=> x.user_id === ctx.senderId)
        let l = ctx.referralValue;
        
        if(i.ref.fff === false){
            let n = users.find(x=> x.id === Number(l))
            i.ref.id = n.id;
            i.bal += 500;
            i.ref.name_user = n.name;
            
            n.ref.count += 1;
            n.bal += 250;
            ctx.send(`
            Спасибо за приглашения друга!
            +1 реферал (${i.name})

            +250 монет

            `, {
                user_id: n.user_id
            })

            return ctx.send(`
            Вы перешли по реф. ссылке! :) <3

            Вы стали рефералом ${n.name}
            +500 монет

            `)

        }
    if(i.ref.fff === true){
        return ctx.send(`Вы уже были приглашены пользователём ${n.name}`)
    }

    }

    return next();
});

st.hear(/^(?:test)$/i, async ctx => {
    let u = users.find(x=> x.user_id === ctx.senderId)

    vk.api.call('utils.getShortLink', {
        link: `https://vk.me/club${cfg.vkg}?ref=${u.id}`
    }).then((press_F_to_respect) => {
        u.ref.ref_url = press_F_to_respect.short_url;

        return ctx.send(`
        Ваша реф. ссылка для друзей:
        &#2; &#2; ${u.ref.ref_url}
        
        Друзей: ${u.ref.count} <3
        `)
    })
})

