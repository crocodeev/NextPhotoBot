
 class Api {
    private domain: string
    private initData: string
    private user: string

    private static instance: Api


    private constructor () {
        this.domain = window.location.protocol + "//" + window.location.host
        this.initData = window.Telegram.WebApp.initData
        this.user = window.Telegram.WebApp.initDataUnsafe.user
    }

    public static getInstance () {
        if(!Api.instance){
            Api.instance = new Api() 
        }

        return Api.instance
    }

    public async uploadFiles (formData: FormData,
                                 folderName: string) {

        formData.append("folder", folderName)
        formData.append("user", this.user);

        const requestOptions = {
            method: 'POST',
            body: formData,
          };
        
        const url = this.domain + "/nc/file"  
        
        return fetch(url, requestOptions)
        .then(response => response.text())

    }
    
    public createFolder (parentFolder: string,
                                folder: string) {

        const withUnderscore = folder.replace(" ", "_");
        const withFullPath = parentFolder + "/" + withUnderscore;                            

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                initData: this.initData,
                user: this.user,
                folder: withFullPath 
            })
        };

        const url = this.domain + "/nc/createfolder"

        return fetch(url, requestOptions)
        .then(response => response.json())

    }

    public async getFolders (folderFullName: string) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                initData: this.initData,
                user: this.user,
                folderFullName: folderFullName  })
        }

        const url = this.domain + "/nc/folders"

        return fetch(url, requestOptions)
        .then(response => {
            if(response.status === 401){
              return Promise.reject("Your are not allowed to upload images");
            }
            return response.text();
        })
        .then(data => JSON.stringify(data))
        .then(data => {
            return JSON.parse(JSON.parse(data))
        })
    }
 }

 export default Api