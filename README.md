### NEXTCLOUD PHOTOBOT

Telegram webapp application,that allow users to upload photo on nextcloud. 
Writing for buisness process in my company, but may be suits for your purposes.

#### installation

* clone repo
* npm i
* create ./setting/.env file

> TELEGRAM= telegram token
> PORT= server port
> NC_USER= nextcloud user name
> NC_PASSWD=nextcloud user password
> NC_URL=nextcloud server url
> USER_CHAT_ADMIN=admin chat for authorize user
> COMMON_CHAT=chat id for logs

* npm run build prod
* docker build . --tag name

#### docker installation

* sudo docker run -d -p 127.0.0.1:8080:8080 --add-host ex.ample.com:0.0.0.0 -v ~/sweetmemory/settings:/app/settings --name sweetmemory crocodeev/sweetmemory
* ex.ample.com:0.0.0.0 - manually resolve dns to nextcloud host

#### npm commands

* "https-fwd" - ngrok forwarding for test purpose
* "build:dev" - create developer build with track changes in frondend and restart server
* "build:prod" - build for production
* "build:dev-server" - build server only
* "start" - start server
* "dev:server" - start local developer server
* "dev:tg": - start local developer server for testing in telegram with ng-rok tunnel

### ToDo

- [ ] add logs
- [ ] add mongo db (now using file db)
