const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../models/User");
db.Note = require("../models/Note");

db.User.hasMany(db.Note, {as: "Notes"});
db.Note.belongsTo(db.User, {
    foreignKey: "userId",
    as: "user",
});

module.exports = db;
