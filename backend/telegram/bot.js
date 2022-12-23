import * as dotenv from 'dotenv'; 
dotenv.config({path: './settings/.env'});
import { setUser } from '../db/db';
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM;
const userAdminChat = process.env.USER_CHAT_ADMIN;
const commonChat = process.env.COMMON_CHAT;
const publicUrl = process.env.PUBLIC_URL;

class Bot {

  constructor(token,
              userAdminChat,
              commonChat,
              publicUrl){

                if(!!Bot.instance){
                  return Bot.instance;
                }

                Bot.instance = this;

                this.token = token;
                this.userAdminChat = userAdminChat;
                this.commonChat = commonChat;
                this.publicUrl = publicUrl;
                this.bot;

              }
  
   init(){

    if(this.publicUrl){

      console.log("Public url finded");

      this.bot = new TelegramBot(this.token);
      try {

        this.bot.setWebHook(publicUrl, {
          certificate: './settings/crt.pem'
        });

      } catch (error) {
        
        console.log(error);
      }
      
    }else{
      
      this.bot = new TelegramBot(this.token, {polling: true});
    }

    //listeners

    this.bot.onText(/\/authorize/, async (msg) => {

      const requestChatID = msg.chat.id;
      const user = msg.from;

      if(requestChatID < 0){
        this.bot.sendMessage(requestChatID, "Авторизируйтесь в приватном чате!")
        return;
      }

      //control listeners
      if(this.bot.listenerCount('callback_query')){
        this.bot.sendMessage(requestChatID, 'Терпение, мой друг, терпение');
        return;
      }
  
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
      console.log("Count event emmiters");
      console.log(this.bot.listenerCount('callback_query'));


      this.bot.on('callback_query', async (callbackQuery) => {
  
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
            this.bot.sendMessage(this.userAdminChat, 'Пользователь добавлен');
            this.bot.sendMessage(requestChatID, 'Запрос принят, можете загружать фотографии');
            
          }else{
            this.bot.sendMessage(this.userAdminChat, 'Внутренняя ошибка сервера');
            this.bot.sendMessage(requestChatID, 'Внутренняя ошибка сервера, обратитесь к системному администратору');
          }
  
        }else{
          this.bot.sendMessage(this.userAdminChat, 'Запрос отклонён');
          this.bot.sendMessage(requestChatID, 'Запрос отклонён');
        }
  
        this.bot.removeListener("callback_query");
      });
  
      //send keyboard
      this.bot.sendMessage(this.userAdminChat, `Разрешить ${user.first_name} ${user.last_name} загружать фотографии`, opts);
      this.bot.sendMessage(requestChatID, 'Ожидайте подтверждения');
  
    })
  
  }
  
  sendLog(message, chat){
    this.bot.sendMessage(chat || this.commonChat, message);
  }

}

const bot = new Bot(
  token,
  userAdminChat,
  commonChat,
  publicUrl
);

bot.init();

export default bot;
