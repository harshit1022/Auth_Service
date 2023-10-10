const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const UserService = require('./services/user-service');

const app = express();

const prepareAndStartServer = () => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use('/api', apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started on Port: ${PORT}`);

    //---------TESTING TOKEN GENERATION AND VERIFICATION ON CONSOLE---------
    //const userService = new UserService();
    
    // const result = userService.createToken({email: "harshit@admin.com", password: '123HP'});
    // console.log(result);
    // Output: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcnNoaXRAYWRtaW4uY29tIiwicGFzc3dvcmQiOiIxMjNIUCIsImlhdCI6MTY5NjkyNDQ3NCwiZXhwIjoxNjk2OTMxNjc0fQ.SJ9GJ7HjsKFxUHI2DJJfOKYtyTI6vdE4-Ks2L-5SwnU'
    
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcnNoaXRAYWRtaW4uY29tIiwicGFzc3dvcmQiOiIxMjNIUCIsImlhdCI6MTY5NjkyNDQ3NCwiZXhwIjoxNjk2OTMxNjc0fQ.SJ9GJ7HjsKFxUHI2DJJfOKYtyTI6vdE4-Ks2L-5SwnU';
    // const response = userService.verifyToken(token);
    // console.log(response);
    // Output:   {
              //   email: 'harshit@admin.com',
              //   password: '123HP',
              //   iat: 1696924474,
              //   exp: 1696931674
              // }
  });
}

prepareAndStartServer();