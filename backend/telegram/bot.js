import * as dotenv from 'dotenv'; 
dotenv.config({path: './settings/.env'});
import { setUser } from '../db/db';
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM;
const publicUrl = process.env.PUBLIC_URL;

let bot;

//hooks or polling 

if(publicUrl){
  bot = new TelegramBot(token);
  bot.setWebHook(publicUrl, {
    certificate: './settings/crt.pem'
  });
}else{
  bot = new TelegramBot(token, {polling: true});
}
    

  bot.onText(/\/authorize/, async (msg) => {

    const user = msg.from;

    //keyboard
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Accept',
              callback_data: `accept`
            },
            {
              text: 'Decline',
              callback_data: `decline`
            },
          ]
        ]
      }
    };

    //register callback query 
    bot.on('callback_query', async (callbackQuery) => {

      const action = callbackQuery.data;
      const msg = callbackQuery.message;
      const opts = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
      };
    
      if (action.includes('accept')) {

        console.log(user);
        const result = await setUser(user)
        
        if(result){
          bot.sendMessage(msg.chat.id, 'Пользователь добавлен');
        }else{
          bot.sendMessage(msg.chat.id, 'Внутренняя ошибка сервера, см. лог');
        }

      }else{
        bot.sendMessage(msg.chat.id, 'Запрос отклонён');
      }

      bot.removeListener("callback_query");
    });

    //send keyboard
    bot.sendMessage(msg.from.id, `Разрешить ${user.first_name} ${user.last_name} загружать фотографии`, opts);

  })

  bot.on('sticker', (msg) => {
    console.log(msg);
  })