require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const error = require('./error');

//ROUTES

const authRouter = require('./auth/auth-router');
const userRouter = require('./user/user-router');
const reviewsRouter = require('./reviews/reviews-router');
const discoveryRouter = require('./discovery/discovery-router');

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
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/discovery', discoveryRouter);

app.use(error);

module.exports = app;
