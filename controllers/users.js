const User = require('../models/user')

//CRUD controllers

//GET ALL USER
exports.getUsers = (req,res,next) =>{
    User.findAll().then(users =>{
        res.status(200).json({users:users})
    })
    .catch(err =>console.log(err))
}

// get user by id
exports.getUser = (req,res,next) =>{
    const userId = req.params.userId;
    User.findByPk(userId).then(user =>{
        if (!user) {
            return res.status(404).json({message:'User not found'})
        }
        res.status(200).json({user:user})
    })
    .catch(err => console.log(err))
}

// create user
exports.createUser = (req,res,next) =>{
    const name = req.body.name;
    const email = req.body.email;
    User.create({
        name: name,
        email: email
    })
}

//update user
exports.updateUser = (req,res,next) =>{
    const userId = req.params.userId;
    const updatedName = req.body.name;
    const updateEmail = res.body.email;
    User.findByPk(userId)
        .then(user =>{
            if (!user) {
                return res.status(404).json({message: 'User not found'})
            }
            user.name = updatedName
            user.email = updateEmail
            return user.save();
        })
}

// delete user
exports.deleteUser = (req,res,next) =>{
    const userId = req.params.userId
    User.findByPk(userId)
        .then(user =>{
            if (!user) {
                return res.status(404).json({message:'User not found!'})
            }
            return User.destroy({
                where: {
                    id: userId
                }
            })
        })
        .then(result =>{
            res.status(200).json({message:'User deleted'})
        })
        .catch(err =>console.log(err))
}