const Sequelize = require('sequelize');

const connection = require('./connection');
const CHARSET = 'utf8';
const COLLATE = 'utf8_general_ci';

let database;

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
    default:
        database = new Sequelize(
            connection.development.database,
            connection.development.username,
            connection.development.password, {
                host: connection.development.host,
                port: connection.development.port,
                dialect: connection.development.dialect,
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000,
                },
                charset: CHARSET,
                collate: COLLATE,
                timestamps: true,
                logging: false
            },
        );
}

module.exports = database;