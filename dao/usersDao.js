const connction = require("./connectionWrapper");
const url = "https://randomuser.me/api/"
const axios = require('axios');


//*******************  example for mySQL  *********************
const getAllUsers = async () => {

    let query = "SELECT * FROM `user-managment`.users;";
    try {
        let allUsers = await connction.execute(query);
        //console.log(allUsers)
        return allUsers;
    }
    catch (error) {
        throw new Error(" Message: " + error.message);
    }

}


const getUserById = async (id) => {

    let query = 'SELECT * FROM `user-managment`.users where user_id=?'
    let params = [id];

    try {
        let user = await connction.executeWithParameters(query, params)
        return user;
    }
    catch (error) {
        throw new Error(" Message: " + error.message);
    }
}

const addUser = async (name, phone, address) => {

    let query = 'INSERT INTO `user-managment`.users (user_name,user_phone,address) VALUES (?, ?, ?)';
    let params = [name, phone, address];

    try {
        let result = await connction.executeWithParameters(query, params);
        return result.insertId;;
    }
    catch (error) {
        throw new Error(" Message: " + error.message);
    }
}


const deleteUser = async (id) => {

    let query = 'DELETE FROM `user-managment`.users WHERE user_id = ?';
    let params = [id]
    try {
        await connction.executeWithParameters(query, params);
        return true;
    }
    catch (error) {
        throw new Error("message: " + error.message)
    }
}

const editUserAddressById = async (id, newAddress) => {
    const query = 'UPDATE `user-managment`.users SET address = ? WHERE user_id = ?';
    const params = [newAddress, id];
    try {
        await connction.executeWithParameters(query, params);
        return true;
    }
    catch (error) {
        throw new Error("message: " + error.message)
    }
}



/*
//*******************  example for api  *********************
const getAllUsers =  async () =>{ 

    try{
        let allUsers = await axios.get(`${url}?inc=id,gender,name,phone&results=10`);
        return  allUsers;
    }
    catch(error){
        throw new Error(" Message: " + error.message);
    }

}


const getUserById = async (id) =>{ 
    try{
        let user = await axios.get(`${url}?inc=id,gender,name,phone&?id.value=${id}`);
        return  user.data.results;
    }
    catch(error){
        throw new Error(" Message: " + error.message);
    }
}

*/


module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    editUserAddressById

}