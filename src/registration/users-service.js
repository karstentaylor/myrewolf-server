const bcrypt = require('bcryptjs');
const xss = require('xss');

//SPECIAL CHARACTERS TO PASSWORD VALIDATION   
const validation = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/;

const userService = {

  //PASSWORD VALIDATION
  passValidation(password) {
    if (password.length < 6) {
      return 'Password needs to be longer than 6 characters.';
    }
    if (password.length > 12) {
      return 'Password needs to be shorter than 12 characters.';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not have empty spaces.';
    }
    if (!validation.test(password)) {
      return 'Password must contain one upper case, a lower case, a number and a special character';
    }
    return null;
  },

  //HASHING THE PASS. USING BCRYPT
  passHash(password) {
    return bcrypt.hash(password, 12);
  },
    
  //XSS TO PROTECT AGAINST SCRIPT ATTACKS
  serializeUser(user) {
    return {
      id: user.id,
      email: xss(user.email),
      name: xss(user.name),
      password: xss(user.password),
      admin: user.admin
    };
  },

  //CHECKS FOR UNIQUE EMAIL
  emailExists(db, email) {
    return db('users')
      .where({ email })
      .first()
      .then(email => !!email);
  },

  //NAME LENGTH VALIDATION
  nameValidation(name){
    if(name.length > 25){
      return 'Name has too many characters.';
    }
    return null;
  },

  //EMAIL VALIDATION
  emailValidation(email){
    return db('users').where({ email });
    //SELECT * FROM people WHERE email NOT LIKE '%_@__%.__%'
    //TODO validate email

  },

  //ADDING A NEW USER
  addUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([users]) => users);
  },

};

module.exports = userService;