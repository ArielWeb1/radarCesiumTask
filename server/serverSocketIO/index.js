const express = require('express');
var app = express();
var http = require('http');

const server = http.Server(app);
socketIO = require('socket.io');

const io = socketIO(server);
const port = process.env.PORT || 3000;

let endLongitude = 1;
let endLatitude = 1;

const radarImageURL = 'https://image.flaticon.com/icons/svg/186/186078.svg';
const billboard = {
    image: radarImageURL,
    width: 30,
    height: 30
};

// const polyline = {
//     positions: Cesium.Cartesian3.fromDegreesArrayHeights([endLatitude, endLongitude, 10000.0, pointsOfRadar[id].longitude, startLongitude, 0.0]),
//     width: 5,
//     material : new Cesium.PolylineGlowMaterialProperty({
//         glowPower : 0.2,
//         color : Cesium.Color.YELLOW
//     })
// };

const pointsOfRadar = [
    {id: 1, longitude: 34.7817676, latitude: 32.0852999, billboard: billboard},
    {id: 2, longitude: -0.1277583, latitude: 51.5073509, billboard: billboard},
    {id: 3, longitude: 2.3522219, latitude: 48.856614, billboard: billboard},
    {id: 4, longitude: -73.99, latitude: 40.7327753, billboard: billboard},
    {id: 5, longitude: 12.4853655, latitude: 41.8899999, billboard: billboard},
    {id: 6, longitude: 139.6917064, latitude: 35.6894875, billboard: billboard},
    {id: 7, longitude: 2.1734035, latitude: 41.3850639, billboard: billboard},
    {id: 8, longitude: -2.2426305, latitude: 53.4807593, billboard: billboard},
    {id: 9, longitude: -3.7037901999, latitude: 40.4167754, billboard: billboard},
    {id: 10, longitude: -1.1037901999, latitude: 42.7167754, billboard: billboard}
];

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

app.get('/', (req, res) => res.send("Hello"));

io.on('connection', (socket) => {
    console.log('user connected');
    socket.emit('hello', pointsOfRadar, {});

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

let sockets = new Set();

app.use(express.static(__dirname + '/dist'));

io.on('connection', (socket) => {

    sockets.add(socket);
    console.log(`Socket ${socket.id} added`);

    socket.on('clientdata', (data) => {
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log(`Deleting socket: ${socket.id}`);
        sockets.delete(socket);
        console.log(`Remaining sockets: ${sockets.size}`);
    });

});

io.on('connection', (socket) => {
    console.log('point change');

    setInterval(() => {
        socket.emit('change', createPolyline(), {});
        console.log( 'print', createPolyline());
    }, 10000);
});

function createPolyline() {

     polyline = pointsOfRadar.map( radar => {
        endLatitude = 35 + Math.random();
        endLongitude = 32 + Math.random();
        return {
            id: radar.id,
            positions: [endLatitude, endLongitude, 10000.0, radar.longitude, radar.latitude, 0.0],
            width: 5
        }
    });
    // console.log(JSON.stringify(polyline));
    return polyline;

    // pointsOfRadar.forEach(radar => {
    //     let polyline = {
    //         positions: Cesium.Cartesian3.fromDegreesArrayHeights([endLatitude, endLongitude, 10000.0, radar[id].longitude, radar[id].latitude, 0.0]),
    //         width: 5,
    //         material: new Cesium.PolylineGlowMaterialProperty({
    //             glowPower: 0.2,
    //             color: Cesium.Color.YELLOW
    //         })
    //     };
    //     console.log([polyline]);
    //     return polyline;
    // })
}

server.listen(3000);
console.log('Visit http://localhost:3000 in browser');
