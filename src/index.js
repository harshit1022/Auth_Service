const express = require('express');
const bodyParser = require('body-parser');

const db = require('./models/index');

const { PORT } = require('./config/serverConfig');
const {User, Role} = require('./models/index');
const apiRoutes = require('./routes/index');
const UserService = require('./services/user-service');
const UserRepository = require('./repository/user-repository');

const app = express();

const prepareAndStartServer = () => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use('/api', apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started on Port: ${PORT}`);
    if(process.env.DB_SYNC) {
      db.sequelize.sync({alert: true});
    }

    const user1 = await User.findByPk(4);
    const role1 = await Role.findByPk(1);

    // user1.addRole(role1);
    // const response = await user1.getRoles();
    // console.log(response);
    
    // const response = await user1.hasRole(role1);
    // console.log(response);    
  });
}

prepareAndStartServer();