import { Router } from 'express';
import tgValidatiion from '../middleware/tgValidation';
import dayjs from 'dayjs';
import Nextcloud from '../nextcloud/nextcloud';
import path from 'path';
import { getBaseName } from '../utils/utils';
import CyrillicToTranslit from 'cyrillic-to-translit-js';


const cyrillicToTranslit = new CyrillicToTranslit();
const api = new Router();
const nextcloud = new Nextcloud();

//api.use(tgValidatiion);

api.post('/folders', async (req, res) => {

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

api.post('/file', async (req, res) => {

    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    const stamp = dayjs().format('YYYY-MM-DD_HH:mm');
    const files = Object.entries(req.files);
    const folder = req.body.folder;
    

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

        res.status(200).send('accepted');

    }catch(error){
        console.log(error);
    }
    
});

export default api;