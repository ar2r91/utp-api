require('dotenv').config();
const path = require('path');
const express = require("express");
const app = express();
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.set('port', 3000);

const server = app.listen(app.get('port'),'192.168.1.14', function () {
    console.log('server on port', app.get('port'));
});

/*const SocketIO = require('socket.io');
global.io = SocketIO.listen(server);

io.on('connection', function (socket) {
    socket.emit("message", "PRENDIDO");
})*/

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', routes);
app.use(cors())

global.appRoot = path.resolve(__dirname);

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
