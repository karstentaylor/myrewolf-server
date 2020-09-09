/* eslint-disable indent */
const express = require('express');
const registrationService = require('./registration-service');
const registrationRouter = express.Router();
const jsonBodyParser = express.json();
const logs = require('../logs');
const { serializeUser } = require('./registration-service');

//TODO ADD AUTH

registrationRouter
  .route('/api/user')
  .post(jsonBodyParser, (req, res, next) => {

    const { name, email, password } = req.body;
      
    //VALIDATION FOR REQUIRED FIELDS
    for (const field of ['email', 'password', 'name'])
      if (!serializeUser[field]) {
        logs.error(`User ${field} is required`);
        return res
          .status(400)
          .json({ error: `The ${field} is required.` });
      }

    
    try { 
        //PASSWORD VALIDATION
        const passError = registrationService.passValidation(password);

        if (passError) {
        logs.error(passError);
        return res
            .status(400)
            .json({ error: passError });
        }

        //NAME VALIDATION
        const nameError = registrationService.nameValidation(name);

        if(nameError){
            logs.error(nameError);
            return res
            .status(400)
            .json({ error: nameError });
        }

        //EMAIL VALIDATION
        const emailError = registrationService.emailValidation(email);

        if(nameError){
            logs.error(emailError);
            return res
            .status(400)
            .json({ error: emailError });
        }

        if (registrationService.emailExists)
        return res
        .status(400)
        .json({ error: 'Email already exists.' });

        //HASHES PASSWORD
       async function hashedPassword(){ 
         
        const hashingPass = await registrationService.hashPassword(password);

        const newUser = {
            name,
            password: hashingPass,
            email,
            admin,
        }
        //TODO DO i need admin here?

      
        const user = await registrationService.addUser(
          req.app.get('db'),
          newUser
      )}

      res
      .status(201)
      .location(path.posix.join(req.originalUrl, `/${user.id}`))
      .json(registrationService.serializeUser(user))

    }
    catch(error){
        next(error);
    }
  });

  module.exports = registrationRouter;