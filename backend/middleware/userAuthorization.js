import { checkUser } from "../db/db";

const userAuthorization = async (req, res, next) => {

    const user = typeof req.body.user === "string" ? JSON.parse(req.body.user) : req.body.user;

    const isUserInBase = await checkUser(user.id);

    if(isUserInBase){
        next();
    }else{
        res.status(401).send("Пожалуйста, авторизуйтесь используя команду /authorize в чате");
    }

}

export default userAuthorization