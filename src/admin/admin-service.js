const REGEX_UPPER_LOWER_NUMBER = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\S]+/;
const xss = require('xss');
const bcrypt = require('bcryptjs');

const AdminService = {
    validatePassword(password) {
        if (password.length < 8) {
          return 'Password must be longer than 8 characters';
        }
        if (password.length > 72) {
          return 'Password must be shorter than 72 characters';
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
          return 'Password must not start or end with empty spaces';
        }
        if (!REGEX_UPPER_LOWER_NUMBER.test(password)) {
          return 'Password must contain an uppercase, lowercase, and number';
        }
        return null;
    }
}