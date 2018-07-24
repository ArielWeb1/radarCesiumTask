const express = require('express')
var app = express();
var http = require('http');

const server = http.Server(app);
socketIO = require('socket.io');

const io = socketIO(server);
const port = process.env.PORT || 3000;

const pointsOfRadar = [
    { id: 1, longitude: 34.7817676, latitude: 32.0852999},
    { id: 2, longitude: -0.1277583, latitude: 51.5073509},
    { id: 3, longitude: 2.3522219, latitude: 48.856614},
    { id: 4, longitude: -73.99, latitude: 40.7327753},
    { id: 5, longitude: 12.4853655, latitude: 41.8899999},
    { id: 6, longitude: 139.6917064, latitude: 35.6894875},
    { id: 7, longitude: 2.1734035, latitude: 41.3850639},
    { id: 8, longitude: -2.2426305, latitude: 53.4807593},
    { id: 9, longitude: -3.7037901999, latitude: 40.4167754},
    { id: 10, longitude: -3.7037901999, latitude: 40.4167754}
];

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

app.get('/', (req, res) => res.send("Hello"));

io.on('connection', (socket) => {
    console.log('user connected');
    socket.emit('hello', {
        // greeting: 'Hello you'
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user disconnect', {});
    });
});

let timerId = null,
    sockets = new Set();
app.use(express.static(__dirname + '/dist'));

io.on('connection', socket => {

    sockets.add(socket);
    console.log(`Socket ${socket.id} added`);

    if (!timerId) {
        startTimer();
    }

    socket.on('clientdata', data => {
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log(`Deleting socket: ${socket.id}`);
        sockets.delete(socket);
        console.log(`Remaining sockets: ${sockets.size}`);
    });

});

function startTimer() {

    timerId = setInterval(() => {
        if (!sockets.size) {
            clearInterval(timerId);
            timerId = null;
            console.log(`Timer stopped`);
        }
        let value = ((Math.random() * 50) + 1).toFixed(2);

        for (const s of sockets) {
            console.log(`Emitting value: ${value}`);
            s.emit('data', {data: value});
        }

    }, 2000);
}

server.listen(3000);
console.log('Visit http://localhost:3000 in browser');
