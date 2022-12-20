import { checkUser } from "../db/db";

const userAuthorization = async (req, res, next) => {

    console.log(req.body);

    console.log("ТИП ПОЛЬЗОВАТЕЛЯ");
    console.log(typeof req.body.user);

    const user = typeof req.body.user === "string" ? JSON.parse(req.body.user) : req.body.user;

    console.log(user);

    const isUserInBase = await checkUser(user.id);

    console.log(isUserInBase);

    if(isUserInBase){
        next();
    }else{
        res.status(401).send("Not allowed!");
    }

}

export default userAuthorization