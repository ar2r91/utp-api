const express = require('express');

const api = express.Router();

const userController = require('../controllers/UserController');
const noteController = require('../controllers/NoteController');

api.post('/user/register', userController.register);
api.post('/user/login', userController.login);
api.post('/user/:id/notes', userController.getNotes);

api.post('/note/register', noteController.register);

module.exports = api;
