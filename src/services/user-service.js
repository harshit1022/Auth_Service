const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRepository  = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');

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

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, {expiresIn: '2h'});
      return result;
    } 
    catch (error) {
      console.log('Something went wrong while creating Token in Service Layer');
      throw error;        
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } 
    catch (error) {
      console.log('Something went wrong in Service Layer', error);
      throw error;      
    }
  }

  comparePaasword(userPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userPlainPassword, encryptedPassword)      
    } 
    catch (error) {
      console.log('Something while Comparing Password', error);
      throw error;       
    }
  }
}

module.exports = UserService;

