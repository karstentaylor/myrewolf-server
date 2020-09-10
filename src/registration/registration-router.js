const express = require('express');
const registrationService = require('./registration-service');
const registrationRouter = express.Router();
const jsonBodyParser = express.json();
const logs = require('../logs');
const path = require('path');
const { serializeUser } = require('./registration-service');

//TODO ADD AUTH

registrationRouter
  .route('/api/register')
  .post(jsonBodyParser, (req, res, next) => {

    const trimUser = {
      name: req.body.name.trim().replace(/\s+/g, ''),
      password: req.body.password,
      email: req.body.email.trim(),
    }
      
    //VALIDATION FOR REQUIRED FIELDS
    for (const field of ['name', 'password', 'email'])
      if (!trimUser[field]) {
        logs.error(`User ${field} is required.`);
        return res
          .status(400)
          .json({ error: `The ${field} field is required.` });
      }

    //PASSWORD VALIDATION
    const passError = registrationService.passValidation(trimUser.password);

    if (passError) {
      logs.error(passError);
      return res
        .status(400)
        .json({ error: passError });
    }

    //NAME VALIDATION
    const nameError = registrationService.nameValidation(trimUser.name);

    if(nameError){
      logs.error(nameError);
      return res
        .status(400)
        .json({ error: nameError });
    }

    //EMAIL VALIDATION
    const emailError = registrationService.emailValidation(trimUser.email);

    if(emailError){
      logs.error(emailError);
      return res
        .status(400)
        .json({ error: emailError });
    }

    //ADDING USER VALIDATION
    registrationService
      .emailExists(req.app.get('db'), trimUser.email)
      .then((validReg) => {
        if (validReg) {
          logs.error('Email already exists.');
          return res
            .status(400)
            .json({ error: 'Email already exists. Try again.' });
        }

        return registrationService
          .passHash(trimUser.password)
          .then((hashedPass) => {
            trimUser.password = hashedPass;

            return registrationService
              .addUser(req.app.get('db'), trimUser)
              .then((user) => {
                logs.info(
                  `User created successfully. The user id is: ${user.id}.`
                );
                res
                  .status(200)
                  .location(
                    path.posix.join(
                      'http://localhost:8000', //TODO add the heroku link
                      `/user/${user.id}`
                    )
                  )
                  .json(serializeUser(user));
              });
          });
      })
      .catch(next);
  });

module.exports = registrationRouter;