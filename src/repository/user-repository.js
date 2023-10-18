const ValidationError  = require('../utils/validation-error');
const { User, Role } = require('../models/index');
const { StatusCodes } = require('http-status-codes');
const ClientError = require('../utils/client-error');

class UserRepository {

    async create(data) {
      try {
        const user = await User.create(data);
        return user;
      } 
      catch (error) {
        if(error.name == 'SequelizeValidationError') {
          let validationError = new ValidationError(error);
          throw validationError;
        }
        console.log('Something went wrong in Repository Layer');
        throw error;
      }
    }

    async destroy(userId) {
      try {
        await User.destroy({
          where: {
            id: userId
          }
        }); 
      } 
      catch (error) {
        console.log('Something went wrong in Repository Layer');
        throw error;
      }
    }

    async getById(userId) {
      try {
        const user = await User.findByPk(userId, {
          attributes: ['email', 'id']
        });
        return user;
      } 
      catch (error) {
        console.log('Something went wrong in Repository Layer');
        throw error;        
      }
    }

    async getByEmail(emailIdByUser) {
      try {
        const user = await User.findOne({
          where: {
            email: emailIdByUser
          }
        });
        if(!user) {
          throw new ClientError(
            'AttributeNotFound',
            'Invalid email sent in the request',
            'No valid record of given email in database found',
            StatusCodes.NOT_FOUND
          ); 
        }
        return user;
      } 
      catch (error) {
        console.log('Something went wrong in Repository Layer, while getting user by Email Id');
        throw error;         
      }
    }

    async isAdmin(id) {
      try {
        const user = await User.findByPk(id);
        const adminRole = await Role.findOne({
          where : {
            name: 'Admin'
          }
        });
        return user.hasRole(adminRole);
      } 
      catch (error) {
        console.log('Something went wrong in Repository Layer, while checking for Admin');
        throw error;         
      }
    }
}

module.exports = UserRepository;