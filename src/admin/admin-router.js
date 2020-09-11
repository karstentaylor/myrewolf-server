const express = require('express');
const AdminService = require('./admin-service');
const { requireAuth } = require("../middleware/jwt-auth");
const bodyParser = express.json();


const adminRouter = express.Router();
const jsonBodyParser = express.json();

adminRouter.route("/api/:user")
    .all(requireAuth)
    .get((req, res, next) => {
        AdminService.getAllUsers(req.app.get('db'))
        .then(users => {
            res
            .status(200)
            .json(users)
        })
        .catch(next)
    })
    .delete(bodyParser, (req, res, next) => {
        const { email } = req.params;

        AdminService.deleteUser(req.app.get("db"), email)
            .then(() => {
                res.status(204);
            })
            .catch(next);
    });

module.exports = adminRouter;
