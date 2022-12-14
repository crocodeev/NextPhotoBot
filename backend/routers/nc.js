import { Router } from 'express';
import tgValidatiion from '../middleware/tgValidation';
import userAuthorization from '../middleware/userAuthorization';
import dayjs from 'dayjs';
import Nextcloud from '../nextcloud/nextcloud';
import path from 'path';
import { getBaseName } from '../utils/utils';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import bot from '../telegram/bot';

const cyrillicToTranslit = new CyrillicToTranslit();
const nc = new Router();
const nextcloud = new Nextcloud();

//api.use(tgValidatiion);
nc.use(userAuthorization)

nc.post('/folders', async (req, res) => {

    const folderName = req.body.folder;

    try {
        const folders = await nextcloud.getFolder(folderName);

        res.status(200).json({
            folders: folders
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
    
    
});

nc.post('/file', async (req, res) => {

    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    const stamp = dayjs().format('YYYY-MM-DD_HH:mm');
    const files = Object.entries(req.files);
    const folder = req.body.folder;
    const user = typeof req.body.user === "string" ? JSON.parse(req.body.user) : req.body.user;
    const userFullname = user.first_name + " " + user.last_name; 

    try{

        const sendAll = async () => {

            return Promise.all( 

                files.map((item, index) => {
                const obj = item[1];
                const base = cyrillicToTranslit.transform(getBaseName(folder)[0], '_').toLowerCase();
                const baseName = `${base}_${index}_${stamp}.jpg`;
                console.log(baseName);
                console.log(folder);
                const fullName = path.join(folder, baseName);
                console.log(fullName);    
                return nextcloud.uploadFile(fullName, obj.data);

            }))

        }

        const result = await sendAll();

        console.log(result);

        res.status(200).send('???????????????????? ?????????????? ??????????????????!');

        bot.sendLog(`${userFullname} ???????????????? ???????????????????? ?? ?????????? ${getBaseName(folder)[0]}`);
        bot.sendLog('???????????????????? ?????????????? ??????????????????', user.id);

    }catch(error){
        console.log(error);
    }
    
});

export default nc;