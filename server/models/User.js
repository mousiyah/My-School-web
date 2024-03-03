const db = require('../config/db');

class User {
  static findByEmailAndPassword(email, password) {
    return db.oneOrNone('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
  }
}

module.exports = User;
