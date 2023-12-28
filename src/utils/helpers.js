const bcrypt = require('bcryptjs');

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function comparePasswords(raw, hash) {
    return bcrypt.compareSync(raw, hash);
}

module.exports = {
    hashPassword,
    comparePasswords,
};