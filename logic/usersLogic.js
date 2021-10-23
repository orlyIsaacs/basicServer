const usersDao = require("../dao/usersDao");



const getAllUsers = async () => { //id, name, gender 
    const allusers = await usersDao.getAllUsers();
    // manipulations...

    const respo = allusers;
    return respo;
}

/*
//in api example
const getAllUsers = async () =>{ //id, name, gender 
   const allusers = await usersDao.getAllUsers();
    // manipulations...
    
    const respo= allusers.data.results
    return respo ;
}
*/

const getUserById = async (id) => {
    const user = await usersDao.getUserById(id);
    // manipulations...
    if (user.length === 0 || user === null || user === undefined) {
        throw new Error("the user does not exist")
    }

    return user;
}

const addUser = async (req) => {

    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;

    let id = await usersDao.addUser(name, phone, address);
    let newUser = await getUserById(id);
    return newUser;
}

const deleteUser = async (id) => {

    //check if the user is in the db
    await getUserById(id);
    return await usersDao.deleteUser(id);

}

const editUserAddressById = async (id, newAddress) => {
    //check if the user is in the db    
    await getUserById(id);
    await usersDao.editUserAddressById(id, newAddress);
    let updatedUser = getUserById(id);
    return (updatedUser);
}



module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    editUserAddressById
}

