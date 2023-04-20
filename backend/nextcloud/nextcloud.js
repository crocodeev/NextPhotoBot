import Client, { File, Folder, Tag, Share, Server } from "nextcloud-node-client";
import * as dotenv from 'dotenv'; 
dotenv.config();
import path from 'path';

const user = process.env.NC_USER;
const passwd = process.env.NC_PASSWD;
const url = process.env.NC_URL;

class Nextcloud {

    constructor(){
        
        if(!!Nextcloud.instance){
            return Nextcloud.instance
        }

        Nextcloud.instance = this;

        this.server = new Server(
            { basicAuth:
                { password: passwd,
                  username: user
                },
                url: url
            });

        this.client = new Client(this.server);    
    }

    async getFolder(folderName) {
        
        try { 
            const folder = await this.client.getFolder(folderName);
            const rawFolderArray = await folder.getSubFolders();

            const folderNames = rawFolderArray.map(item => item.memento.name);

            if(folderNames.length === 0){
                return []
            }

            return folderNames;

        }catch (error){
            console.log(error);
            return [];
        }
        
    }


    async uploadFile(name, data){

        console.log("FROM NC");
        console.log(name);
        console.log(data);
        
        try {
            const result = await this.client.createFile(name, data)
            return result.baseName;
        }catch(error){
            return(error);
        }
    }

    async createFolder(folderName){

        try {
            const result = await this.client.createFolder(folderName)
            return result.baseName;
        }catch(error){
            return(error);
        }
    }

}


export default Nextcloud;