const express = require('express');
const multer = require("multer");
const multerConfig = require('./config/multer');

const UserController = require('./controllers/UserController');
const MovieController = require('./controllers/MovieController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/profile', ProfileController.index);

routes.get('/movies', MovieController.index);
routes.post('/movies', multer(multerConfig).single('file'), MovieController.create);
routes.delete('/movies/:id', MovieController.delete);
module.exports = routes;