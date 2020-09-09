require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const error = require('./error');

//ROUTES
const registrationRouter = require('./registration/registration-router');
//const loginRouter = require('./login/login-router');
// const authRouter = require('./auth/auth-router');
// const adminRouter = require('./admin/admin-router'); --Seyi

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(
  morgan(morganOption, {
    skip: () => NODE_ENV === 'test',
  })
);
app.use(helmet());
app.use(cors());

//ROUTES CALL
app.use(registrationRouter);
// app.use(loginRouter);
// app.use(authRouter);
// app.use(adminRouter); --Seyi


app.use(error);

module.exports = app;
