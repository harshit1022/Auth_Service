const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRepository  = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');
const AppErrors = require('../utils/error-handler');

class UserService {
  
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } 
    catch (error) {
      if(error.name == 'SequelizeValidationError') {
        throw error;
      }
      throw error;
      // throw new AppErrors( //testing
      //   'ServerCustomError',
      //   'Something went wrong in Service',
      //   'Logical Issue Found',
      //   500
      // );      
    }
  }

  async signIn(email, plainPassword) {
    try {
      // Step 1 => fetch user using email
      const user = await this.userRepository.getByEmail(email);
      console.log(user);

      // Step 2 => compare incoming plainPassword and  stored encryptedPassword
      const passwordMatch = this.comparePassword(plainPassword, user.password);
      
      if(!passwordMatch) {
        console.log("Password doesn't match");
        throw {error: 'Incorrect Password'};
      }

      // Step 3 => If passwords match, generate JWT 
      const newJWT = this.createToken({email: user.email, id: user.id});
      return newJWT;
    } 
    catch (error) {
      if(error.name == 'AttributeNotFound') {
        throw error;
      }
      console.log('Something went wrong in Sign In process');
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if(!response) { // if token is not verified
        throw {error: 'Invalid Token'}
      }
      const user = await this.userRepository.getById(response.id);
      if(!user) { // if token is verified, but the user is not in db anymore
        throw {error: 'User not Present'}
      }
      return user.id;
    } 
    catch (error) {
      console.log('Something went wrong in Authenticating User process');
      throw error;      
    }
  }

  async isAdmin(id) {
    try {
      const response = await this.userRepository.isAdmin(id);
      console.log(response);
      return response;
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

  comparePassword(userPlainPassword, encryptedPassword) {
    try {
      //console.log(encryptedPassword);
      return bcrypt.compareSync(userPlainPassword, encryptedPassword)      
    } 
    catch (error) {
      console.log('Something while Comparing Password', error);
      throw error;       
    }
  }
}

module.exports = UserService;

