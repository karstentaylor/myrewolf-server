const AdminService = {
	getAllUsers(db) {
		return db.select('*').from('users');
	},

	deleteUser(db, id, email) {
		return (
			db('users')
				.where({ id })
				.where({ email })
				// 		db.raw(`id=${id}
				// and email=${email}`)
				// 	)
				.delete()
		);
	},
};

module.exports = AdminService;
