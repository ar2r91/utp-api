const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: (user) => {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(user.password, salt);
    },
    comparePasswords: (password, hash) => bcrypt.compareSync(password, hash)
};