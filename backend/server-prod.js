 /**
 * @todo add ssl sertificate
 */
require('dotenv').config({
    path: './settings/.env'
});
const express = require('express');
const path = require('path');
import nc from './routers/nc';
import fileUpload from 'express-fileupload';
import runBot from './telegram/bot';
const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

(async () => {

    try {
        await runBot();
    } catch (error) {
        console.log(error);
    }

    app.use(express.static(DIST_DIR));
    app.use(fileUpload());
    app.use(express.json());
    app.use('/nc', nc);

    app.get('/', (req, res) => {
        res.sendFile(HTML_FILE);
    })


    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
        console.log("Listening on ...", PORT);
    });    

})()

