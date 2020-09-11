const REGEX_UPPER_LOWER_NUMBER = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\S]+/;
const xss = require('xss');
const bcrypt = require('bcryptjs');

const AdminService = {
	getAllUsers(db) {
		return db.select('*').from('users');
	},

<<<<<<< HEAD
	deleteUser(db, id, user_email) {
		return db('users')
			.where(
				db.raw(`id=${id}
        and email=${user_email}`)
			)
			.delete();
	},
};

module.exports = AdminService;
=======
    deleteUser(db, email) {
      return db("users")
      .where(
        db.raw(`email=${email}`)
      )
      .delete();
    }
}

module.exports = AdminService
>>>>>>> 2087d0d2922a7b8e99bd5a8e62cceb146d0cc4a7
