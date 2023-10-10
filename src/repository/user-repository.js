const { User } = require('../models/index');

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
}

module.exports = UserRepository;