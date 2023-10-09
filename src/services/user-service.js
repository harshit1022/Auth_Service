const UserRepository  = require('../repository/user-repository');

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.repository.create(data);
      return user;
    } 
    catch (error) {
      console.log('Something went wrong in Service Layer');
      throw error;      
    }
  }
}

module.exports = UserService;

