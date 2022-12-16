import { Router } from 'express';
import tgValidatiion from '../middleware/tgValidation';

const dashboard = new Router();

//api.use(tgValidatiion);

//admin login
dashboard.post('/login', async (req,res) => {

    const user = req.body.user;
    const passwd = req.body.passwd;

    //авторизация по токену

})

//get user list
dashboard.post('/list', async (req, res) => {

});

//allow 
dashboard.post('/accept', asyn (req, res) => {


});

dashboard.post('/remove', asyn (req, res) => {


});

export default dashboard;