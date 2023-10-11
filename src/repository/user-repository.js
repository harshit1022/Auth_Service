const { User, Role } = require('../models/index');

class UserRepository {

    async create(data) {
      try {
        const user = await User.create(data);
        return user;
      } 
      catch (error) {
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