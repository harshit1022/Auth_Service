const { response } = require('express');
const UserService  = require('../services/user-service');

const userService = new UserService();

const create = async(req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password
    });
    return res.status(201).json({
      message: 'Successfully created User',
      success: true,
      data: response,
      err: {}
    })
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Cannot create User, error in Controller Layer',
      success: false,
      data: {},
      err: error
    });    
  }
}

const signIn = async(req, res) => {
  try {
    const response = await userService.signIn(req.body.email, req.body.password);
    return res.status(201).json({
      message: 'Successfully Signed In',
      success: true,
      data: response,
      err: {}
    })
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Cannot Sign In, error in Controller Layer',
      success: false,
      data: {},
      err: error
    });      
  }
}

module.exports = {
  create,
  signIn
}