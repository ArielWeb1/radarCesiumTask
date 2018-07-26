const express = require('express');
var app = express();
var http = require('http');

const server = http.Server(app);
socketIO = require('socket.io');

const io = socketIO(server);
const port = process.env.PORT || 3000;

const radarImageURL = 'https://image.flaticon.com/icons/svg/186/186078.svg';
const billboard = {
    image: radarImageURL,
    width: 30,
    height: 30
};

const pointsOfRadar = [
    { id: 1, longitude: 34.7817676, latitude: 32.0852999, billboard: billboard},
    { id: 2, longitude: -0.1277583, latitude: 51.5073509, billboard: billboard},
    { id: 3, longitude: 2.3522219, latitude: 48.856614, billboard: billboard},
    { id: 4, longitude: -73.99, latitude: 40.7327753, billboard: billboard},
    { id: 5, longitude: 12.4853655, latitude: 41.8899999, billboard: billboard},
    { id: 6, longitude: 139.6917064, latitude: 35.6894875, billboard: billboard},
    { id: 7, longitude: 2.1734035, latitude: 41.3850639, billboard: billboard},
    { id: 8, longitude: -2.2426305, latitude: 53.4807593, billboard: billboard},
    { id: 9, longitude: -3.7037901999, latitude: 40.4167754, billboard: billboard},
    { id: 10, longitude: -1.1037901999, latitude: 42.7167754, billboard: billboard}
];

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

app.get('/', (req, res) => res.send("Hello"));

io.on('connection', (socket) => {
    console.log('user connected');
    socket.emit('hello', pointsOfRadar,{
    // socket.send(JSON.stringify(pointsOfRadar),{
    });

    // socket.on('message', (msg) => {
    //     socket.broadcast.emit('new massage', {
    //         message: msg
    //     });
    //     console.log('The message:' + msg);
    // });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user disconnect', {});
    });
});
// app.use(express.static(require('path').join(__dirname, "public")));

let timerId = null,
    sockets = new Set();

app.use(express.static(__dirname + '/dist'));

io.on('connection', (socket) => {

    sockets.add(socket);
    console.log(`Socket ${socket.id} added`);

    // if (!timerId) {
    //     startTimer();
    // }

    socket.on('clientdata', (data) => {
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log(`Deleting socket: ${socket.id}`);
        sockets.delete(socket);
        console.log(`Remaining sockets: ${sockets.size}`);
    });

});

// function startTimer() {
//
//     timerId = setInterval(() => {
//         if (!sockets.size) {
//             clearInterval(timerId);
//             timerId = null;
//             console.log(`Timer stopped`);
//         }
//         let value = ((Math.random() * 50) + 1).toFixed(2);
//
//         for (const s of sockets) {
//             console.log(`Emitting value: ${value}`);
//             s.emit('data', {data: value});
//         }
//
//     }, 2000);
// }

server.listen(3000);
console.log('Visit http://localhost:3000 in browser');
