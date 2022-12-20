import * as dotenv from 'dotenv'; 
dotenv.config({path: './settings/.env'});
import crypto from 'crypto';

//parse initData string, take hash only
const getHashFromInitData = (initData) => {
    const initDataDecoded = decodeURIComponent(initData);
    const hash = initDataDecoded.split("=").at(-1);
    return hash;
}

const getSecretKey = () => {
    const hmac = crypto.createHmac("sha256", "WebAppData");
    const secretKey = hmac.update(process.env.TELEGRAM).digest();
    return secretKey;
}

const formatDataCheckString = (initData) => {
    
    const decodeSplittedString = decodeURIComponent(initData).split('&');
    //remove hash part
    decodeSplittedString.pop(-1);
    //sort by key in alphabetical order
    decodeSplittedString.sort();
    const resultString = decodeSplittedString.join('\n');

    return resultString;
}

const secretKey = getSecretKey();


const tgValidatiion = (req, res, next) => {
    
    const initData = req.body.initData;
    const hash = getHashFromInitData(initData);
    const dataCheckString = formatDataCheckString(initData);

    const hmac = crypto.createHmac("sha256", secretKey);
    const _hash = hmac.update(dataCheckString).digest('hex');
    
    if(hash === _hash){
        console.log('validation ok');
        next();
    }else{
        res.status(401).send("These aren't the bots you're looking for.")
    }
}

export default tgValidatiion;
