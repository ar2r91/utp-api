const Sequelize = require('sequelize');
const bcryptSevice = require('../services/bcrypt');

const sequelize = require('../config/database');

const tableName = 'notes';

const Note = sequelize.define('Note', {
    title: {
        type: Sequelize.STRING,
        unique: true,
    },
    description: {
        type: Sequelize.STRING,
    },
    userId: {
        type: Sequelize.INTEGER,
    },
}, {tableName});


Note.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
};

module.exports = Note;