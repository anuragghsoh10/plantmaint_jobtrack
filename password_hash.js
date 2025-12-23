const bcrypt = require('bcryptjs');
const password = 'lassi@#$%0102'; // hashing password
const hash = bcrypt.hashSync(password, 10);
console.log(hash);