import { JsonDB, Config } from 'node-json-db';

const conf = new Config('./settings/users', true, false, "/");
const db = new JsonDB(conf);

export const setUser = async ({
    id,
    first_name,
    last_name,
    username
}) => {

    const isUserInBase = await checkUser(id);

    if(isUserInBase){
        return true;
    }

    try {
        await db.push(`/${id}`, {
            first_name: first_name,
            last_name: last_name,
            username: username
        });
        return true;

    } catch (error) {
        return false;
        console.log(error);
    }

}

export const checkUser = async (id) => {

    try {
        await db.getData(`/${id}`)
        return true;
    } catch (error) {

        if(error.id === 5){
            return false
        }
        
        console.log(error);
    }

}




