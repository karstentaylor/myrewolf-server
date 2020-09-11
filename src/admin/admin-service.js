

const AdminService = {
    getAllUsers(db) {
      return db
      .select(
        '*'
      )
      .from('users')
    },

    deleteUser(db, id, user_email) {
      return db("users")
      .where(
        db.raw(`id=${id} and email=${user_email}`)
      )
      .delete();
    }
}

module.exports = AdminService