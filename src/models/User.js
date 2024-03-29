const Sequelize = require('sequelize');
const bcryptSevice = require('../services/bcrypt');

const sequelize = require('../config/database');

const hooks = {
    beforeCreate(user) {
        user.password = bcryptSevice.hashPassword(user);
    },
};

const tableName = 'users';

const User = sequelize.define('User', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
    },
}, {hooks, tableName});

User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
};

module.exports = User;