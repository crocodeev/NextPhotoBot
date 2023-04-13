require('dotenv').config({
  path: './settings/.env'
});


import path from 'path';
import express from 'express'
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack/frontend.dev.config';
import nc from './routers/nc';
import fileUpload from 'express-fileupload';

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, '../frontend/index.html');
const compiler = webpack(config);


app.use(webpackDevMiddleware(compiler, {
    publicPath: '/'
  }));

app.use(webpackHotMiddleware(compiler));  
app.use(fileUpload());
app.use(express.json());
app.use('/nc', nc);
app.use

app.get('/', (req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    if (err) {
      
       return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
    })
  });  


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Listening on ...", PORT);
});