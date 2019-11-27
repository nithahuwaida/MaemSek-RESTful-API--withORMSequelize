'use-strict';

const { userModel } = require('../models/user');
const { isEmailValid, 
        isUsernameValid,
        isPasswordValid,
        encrypt,
        compareEncrypt } = require('../helpers/helpers');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'possmaemsek';

exports.registerUser = async (req,res) => {
    try{
        console.log(req.body)
        const fullname = req.body.fullname;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        if (fullname === "" || fullname === null || fullname === undefined) {
            return res.json({
              status: "error",
              response: "Fullname cant be empty"
            });
        }

        if (username === "" || username === null || username === undefined) {
            return res.json({
              status: "error",
              response: "Username cant be empty"
            });
        }
      
        if (!isUsernameValid(username)) {
            return res.json({
              status: 'error',
              response: 'Username cannot contain special character except underscore ( _ )'
            });
        }

        const checkUsername = await userModel.findOne({
            where: { username }
        });
    
        if (checkUsername) {
            return res.json({
                status: "error",
                response: "Username is exist"
            });
        }

        if (username.length < 6 ) {
            return res.json({
              status: "error",
              response: "username must be minimal 6 digits!"
            });
        }

        if (email === "" || email === null || email === undefined) {
            return res.json({
              status: "error",
              response: "Email cant be empty"
            });
        }

        if (!isEmailValid(email)) {
            return res.json({
              status: 'error',
              response: 'Invalid email format'
            });
        }

        const checkEmail = await userModel.findOne({
            where: { email }
        });
    
        if (checkEmail) {
            return res.json({
                status: "error",
                response: "Email is exist"
            });
        }

        if (password === "" || password === null || password === undefined) {
            return res.json({
              status: "error",
              response: "Password cant be empty"
            });
        }

        if (!isPasswordValid(password)) {
            return res.json({
              status: 'error',
              response: 'Password must have lower case, upper case and number'
            });
        }

        if (password.length < 8 ) {
            return res.json({
              status: "error",
              response: "Password must be minimal 8 digits!"
            });
        }

        const newUser = await userModel.create({
            fullname : fullname,
            username : username,
            email : email,
            password : encrypt(password),
        });
        if(newUser){
            const newUserData = await userModel.findOne({
                where : {username : username}
            });      
            return res.json({
                status: 'success',
                response: {
                    message: 'Register successfully',
                    user: {
                        id: newUserData.id,
                        fullname: newUserData.fullname,
                        username: newUserData.username,
                        email: newUserData.email,
                    }
                }
            });
        } else {
            return res.json({
                status: 'error',
                response: 'Register failed'
            });
        }
    } catch {
        res.status(400).json({
            status: 'error',
            response: error
        });
    }
};

exports.loginUser = async (req,res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        if (email === "" || email === null || email === undefined) {
            return res.json({
              status: "error",
              response: "Email cant be empty"
            });
        }

        if (!isEmailValid(email)) {
            return res.json({
              status: 'error',
              response: 'Invalid email format'
            });
        }

        if (password === "" || password === null || password === undefined) {
            return res.json({
              status: "error",
              response: "Password cant be empty"
            });
        }

        const userByEmail = await userModel.findOne({
            where: { email }
          });
      
        if (userByEmail) {
            if (compareEncrypt(password, userByEmail.password)) {
                const token = jwt.sign(
                {
                    id: userByEmail.id,
                    fullname: userByEmail.fullname,
                    username: userByEmail.username,
                    email: userByEmail.email
                },
                secretKey
                );

                res.json({
                    status: 'success',
                    response: {
                        message: 'Login successfully',
                        user: {
                            id: userByEmail.id,
                            fullname: userByEmail.fullname,
                            username: userByEmail.username,
                            email: userByEmail.email,
                        },
                        jwt: token
                    }
                });
            } else {
              res.json({
                status: 'error',
                response: 'Password not match'
              });
            }
        } else {
            return res.json({
                status: 'error',
                response: 'User not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 'error',
            response: error
        });
    }
};

exports.getUserAll = async (req,res) =>{
    try{
        const dataUser = await userModel.findAll();
        res.json({
            status: "success",
            response: dataUser
        });
    } catch (error) {
      res.status(400).json({
        status: "error",
        response: error
      });
    }
}

exports.getUserById = async (req,res) => {
    try{
        const id = req.params.id;
        const dataUserById = await userModel.findOne({
            where : { id }
        });
        if(dataUserById){
            res.json({
                status: "success",
                response: dataUserById
            });
        }else{
            res.json({
                status: "error",
                response : 'User not found' 
            });
        }
    } catch (error) {
      res.status(400).json({
        status: "error",
        response: error
      });
    }
}

exports.updateUser = async (req,res) =>{
    try{
        const id = req.params.id;
        const checkUser = await userModel.findOne({
            where : { id }
        })
        if(checkUser){
            const updateUser = await userModel.update({
                fullname: req.body.fullname,
                username : req.body.username,
                email : req.body.email,
            },{
                where : { id }
            });
            if(updateUser){
                const newUpdateUser = await userModel.findOne({
                    where : { id }
                })
                res.json({
                    status: "success",
                    message: 'Update successfully',
                    response: newUpdateUser
                });
            }
        }else{
            res.json({
                status: "error",
                response : 'User not found' 
            });
        }
    } catch (error) {
      res.status(400).json({
        status: "error",
        response: error
      });
    }
}

exports.deleteUser = async (req,res) =>{
    try{
        const id = req.params.id;
        const checkUser = await userModel.findOne({
            where : { id }
        })
        if(checkUser){
            const deleteUser = await userModel.destroy({
                where : { id }
            });
            if(deleteUser){
                res.json({
                    status: "success",
                    message: 'Delete successfully',
                    response: checkUser
                });
            }
        }else{
            res.json({
                status: "error",
                response : 'User not found' 
            });
        }
    } catch (error) {
      res.status(400).json({
        status: "error",
        response: error
      });
    }
}
