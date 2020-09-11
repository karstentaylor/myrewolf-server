const express = require('express');
const authService = require('./auth-service');
const { requireAuth } = require('../middleware/jwt-auth');
const authRouter = express.Router();
const jsonBodyParser = express.json();
const logs = require('../logs');
const registrationService = require('../registration/registration-service');

authRouter
  .route('/token')
  .post(jsonBodyParser, async (req, res, next) => {
    const { email, password } = req.body
    const loginUser = { email, password }

    //VALIDATION FOR REQUIRED FIELDS
    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body.`
        })

    try {
      //CHECKING IF CORRECT EMAIL
      const dbUser = await authService.getUserWithEmail(
        req.app.get('db'),
        loginUser.email
      )

      if (!dbUser)
        return res
        .status(400)
        .json({
          error: 'Incorrect email or password.',
        })
        //CHECKING IF CORRECT PASSWORD
      const compareMatch = await authService.compareUserPasswords(
        loginUser.password,
        dbUser.password
      )

      if (!compareMatch)
        return res
        .status(400)
        .json({
          error: 'Incorrect email or password.',
        })

        // JWT AUTH
      const sub = dbUser.email
      const payload = {
        id: dbUser.id,
        name: dbUser.name,
      }
      res.send({
        authToken: authService.createUserJwt(sub, payload),
      })
    } catch (error) {
      next(error)
    }
  })

  .put(requireAuth, (req, res) => {
    const sub = req.users.email
    const payload = {
       id: req.users.id,
      name: req.users.name,
    }
    res.send({
      authToken: authService.createUserJwt(sub, payload),
    })
  });

  authRouter
  .route('/user/:id')
  //UPDATES A USER PASSWORD
  .patch(jsonBodyParser, (req, res, next) => {
    const trimUpdateUser = {
      id: req.params.id,
      password: req.body.password.trim(),
    };

    //VALIDATION PASSWORD REQUIRED  
    for (const field of ['password'])
      if (!trimUpdateUser[field]) {
        logs.error(`The ${field} is required.`);
        return res
          .status(400)
          .json({ error: `The ${field} is required.` });
      }

    //CONST CALLING PASSWORD VALIDATION - registration-service.js
    const passError = registrationService.passValidation(trimUpdateUser.password);
    if(passError){
      logs.error(passError);
      return res
        .status(400)
        .json({ error: passError });
    }
    
    //UPDATE USER VALIDATION - registration-service.js
    registrationService
      .updateUser(req.app.get('db'), trimUpdateUser.id, trimUpdateUser.password)
      .then(() => {
        if (trimUpdateUser.password) {
          logs.info(`User ${trimUpdateUser.id}: password was updated successfully.`);
          res.status(204).end();
        }
      })
      .catch(err => {
        res.status(409).json({ error: err });
      });
  });

module.exports = authRouter;