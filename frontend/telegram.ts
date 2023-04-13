
/**
 * open telegram 
 */
export const tgPopUp = (message: string) => {

    //if running in test enviroment
    if (window.Telegram.WebApp.initData === '') {
        console.log("NO TG");
        console.log(message);
        return;
      }

    const params = {
        message: message
    }  

    window.Telegram.WebApp.showPopup(params);
}
