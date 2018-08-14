const express = require('express');
let app = express();
let http = require('http');

const server = http.Server(app);
socketIO = require('socket.io');

const io = socketIO(server);
const port = process.env.PORT || 3000;

let endLongitude = 0;
let endLatitude = 0;

const radarImageURL = 'https://image.flaticon.com/icons/svg/186/186078.svg';
const billboard = {
    image: radarImageURL,
    width: 30,
    height: 30
};

let polyline = [{}];
const radius = 10;

const pointsOfRadar = [
    {id: 1, longitude: 34.7817676, latitude: 32.0852999, billboard: billboard},
    {id: 2, longitude: -0.1277583, latitude: 51.5073509, billboard: billboard},
    {id: 3, longitude: 2.3522219, latitude: 48.856614, billboard: billboard},
    {id: 4, longitude: -23.99, latitude: 40.7327753, billboard: billboard},
    {id: 5, longitude: 12.4853655, latitude: 41.8899999, billboard: billboard},
    {id: 6, longitude: 90.6917064, latitude: 35.6894875, billboard: billboard},
    {id: 7, longitude: 2.1734035, latitude: 41.3850639, billboard: billboard},
    {id: 8, longitude: -2.2426305, latitude: 53.4807593, billboard: billboard},
    {id: 9, longitude: -3.7037901999, latitude: 40.4167754, billboard: billboard},
    {id: 10, longitude: -1.1037901999, latitude: 42.7167754, billboard: billboard}
];

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

app.get('/', (req, res) => res.send("Hello"));

let sockets = new Set();

io.on('connection', (socket) => {
    console.log('user connected');
    socket.emit('hello', pointsOfRadar, {});

    sockets.add(socket);
    console.log(`Socket ${socket.id} added`);

    socket.on('clientdata', (data) => {
        console.log(data);
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user disconnect', {});
        console.log(`Deleting socket: ${socket.id}`);
        sockets.delete(socket);
        console.log(`Remaining sockets: ${sockets.size}`);
    });
});

app.use(express.static(__dirname + '/dist'));

let i = 0;
setInterval(() => {
    i = (i + 1) % 360;
    createPolyline(i);
    if (sockets.size > 0) {
        sockets.forEach(connectedSocket => {
            sendPointsToClient(connectedSocket);
        })
    }
}, 1000);

function sendPointsToClient(socket) {
    // console.log(socket.id);
    // console.log('point change');
    socket.emit('change', createPolyline(i));
    // console.log('print', createPolyline(i));
}

function createPolyline(i) {
    polyline = pointsOfRadar.map(radar => {

        let angle = Math.PI * 2 / (i * 0.0174532925);

        endLongitude = radar.longitude + Math.sin(angle) * radius;
        endLatitude = radar.latitude + Math.cos(angle) * radius;
        return {
            id: radar.id,
            positions: [endLongitude, endLatitude, 10000.0, radar.longitude, radar.latitude, 0.0],
            width: 5
        }
    });
    // console.log(JSON.stringify(polyline));
    // console.log(polyline);
    return polyline;
}

server.listen(3000);
console.log('Visit http://localhost:3000 in browser');
