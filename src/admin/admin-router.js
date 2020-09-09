const express = require('express');
const AdminService = require('./admin-service');
const path = require('path');

const adminRouter = express.Router();
const jsonBodyParser = express.json();

