const express = require('express');
const authService = require('./auth-service');
const { requireAuth } = require('../middleware/jwt-auth');
const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter
  .route('/token')
  .post(jsonBodyParser, async (req, res, next) => {
    const { email, password } = req.body
    const loginUser = { email, password }

    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body.`
        })

    try {
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
  })

module.exports = authRouter;