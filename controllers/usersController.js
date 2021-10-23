const express = require("express");
const usersLogic = require("../logic/usersLogic")
const router = express.Router();


//middlewear
router.all('*', function (req, res, next) {
    console.log("in usercontroller")
    next();
});


router.get('/getAllUsers', async (req, res, next) => {
    try {
        const allUsers = await usersLogic.getAllUsers();
        res.json(allUsers);
    }
    catch (error) { //(message of the error)
        return next(error);
    }

});


router.get('/getUserById/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await usersLogic.getUserById(id);
        res.json(user);
    }
    catch (error) {
        return next(error);
    }

});

router.post('/addUser', async (req, res, next) => {
    try {
        let user = await usersLogic.addUser(req);
        res.json(user);
    }
    catch (error) {
        return next(error);
    }

});


router.delete("/deleteUser/:id", async (req, res, next) => {
    try {
        let message = `user ${req.params.id} was deleted`
        await usersLogic.deleteUser(req.params.id);
        console.log(message)
        res.json(message);

    }
    catch (error) {
        return next(error);
    }

})

router.put("/editUserAddressById/:id/:newAddress", async (req, res, next) => {
    try {
        let message = `user ${req.params.id} was edited`
        let userAfterEdit = await usersLogic.editUserAddressById(req.params.id, req.params.newAddress);
        console.log(message)
        res.send(userAfterEdit);
    }
    catch (error) {
        return next(error);
    }

})

module.exports = router;