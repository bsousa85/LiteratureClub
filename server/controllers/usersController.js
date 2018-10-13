const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/userModel');

exports.getUsers = (req, res, next) => {
    user.find()
        .select('_id username email')
        .exec()
        .then(users => {
            var response = {
                user_count : users.length,
                all_users : users.map(data => {
                    return {
                        _id : data._id,
                        username : data.username,
                        email : data.email
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.signup = (req, res, next) => {
    user.find({username: req.body.username})
        .exec()
        .then(data => {
            if(data.length >= 1) {
                for(var i=0; i<data.length;i++) {
                    if(data[i].email == req.body.email) {
                        return res.status(409).json({
                            message: 'Mail already in use'
                        });
                    }
                    if(data[i].username == req.body.username) {
                        return res.status(409).json({
                            message: 'Username already in use'
                        });
                    }
                }
            }
            else if(!req.body.username) {
                return res.status(401).json({
                    message: 'No username typed'
                });
            }
            else if(!req.body.password) {
                return res.status(401).json({
                    message: 'No password typed'
                });
            }
            else if(!req.body.email) {
                return res.status(401).json({
                    message: 'No email typed'
                });
            }
            else {
                bcrypt.hash(req.body.password, 15, (err,hash) => {
                    if(err) {
                        return res.status(500).json({
                            error: "could not hash"
                        });
                    }
                    else {
                        const newUser = new user({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            password: hash,
                            email: req.body.email
                        });
                        newUser
                            .save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'User created successfully'
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: "error storing user"
                                });
                            });
                    }
                });
            }
        });
}

exports.login = (req, res, next) => {
    user.find({username: req.body.username})
        .exec()
        .then(data => {
            if(data.length<1) {
                return res.json({
                    message: 'Username or Password don\'t match any account'
                });
            }
            if(!req.body.username) {
                return res.json({
                    message: 'No username typed'
                });
            }
            if(!req.body.password) {
                return res.json({
                    message: 'No password typed'
                });
            }
            bcrypt.compare(req.body.password, data[0].password, (err, result) => {
                if(err) {
                    return res.json({
                        message: 'Username or Password don\'t match any account'
                    });
                }
                if(result) {
                    const token = jwt.sign({
                        user : data[0].username,
                        userID: data[0]._id
                    },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h"
                    });
                    return res.json({
                        message: 'Auth successful',
                        token: token,
                        user: data[0].username,
                        userID: data[0]._id
                    });
                }
                res.json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.updateUser = (req, res, next) => {
    user.find({ _id: req.params.id})
        .exec()
        .then(data => {
            if(req.body.password) {
                bcrypt.hash(req.body.password, 15, (err, hash) => {
                    if(err) {
                        return res.status(500).json({
                            error: "could not hash"
                        });
                    }
                    else {
                        var updatedInfo = {};
                        for(var info in req.body) {
                            if(req.body.hasOwnProperty(info)) {
                                if(info === 'password') {
                                    updatedInfo[info] = hash;
                                }
                                else {
                                    updatedInfo[info] = req.body[info];
                                }
                            }
                        }
                        user.update( {_id: req.params.id}, {$set: updatedInfo})
                            .exec()
                            .then(result => {
                                res.json({
                                    message: "User info updated"
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.deleteUser = (req, res, next) => {
    user.remove({_id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.checkUserStatus = (req, res, next) => {
    const token = req.params.token;
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    if(verified) {
        return res.json({
            message: 'User Already Authenticated',
            token: token,
            username: verified.user
        });
    }
    else {
        return res.json({
            message: 'Auth error'
        });
    }
}

