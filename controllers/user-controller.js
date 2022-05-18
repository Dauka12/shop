const userModel = require('../models/user-model')

exports.create = async(req, res) => {
    if(!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone){
        res.status(400).send({ message: "Content can not be empty!"});
    }

    const user = new userModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    })

    await user.save().then(data => {
        res.send({
            message:"User created successfully!",
            user: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error NO. 500"
        });
    });
};

// retrieve all users from db
exports.findAll = async (req, res) => {
    try {
        const user = await userModel.find();
        res.status(200).json(user);
    } catch(error){
        res.status(404).json({message: error.message});
    }
};

// find with id
exports.findOne = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error){
        res.status(404).json({message: error.message});
    }
};

// update user by id
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    await userModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false}).then(data => {
        if(!data) {
            res.status(404).send({
                message: 'User not found'
            });
        } else {
            res.send({message: "User updated successfully"});
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// delete user by id
exports.destroy = async (req, res) => {
    await userModel.findByIdAndRemove(req.params.id).then(data => {
        if(!data) {
            res.status(404).send({
                message: 'User not found'
            });
        } else {
            res.send({message: "User deleted successfully"});
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};