const express = require('express')
 app = express();

 http = require('http');
 server = http.Server(app);

 socketIO = require('socket.io');

app.get('/', (req, res) => res.send("Hello World"));

const io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected');
    socket.emit('hello', {
        greeting: 'Hello you'
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

// const express = require('express'),
//     app = express(),
//     server = require('http').createServer(app);
// io = require('socket.io')(server);
//
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
            s.emit('data', { data: value });
        }

    }, 2000);
}

server.listen(3000);
console.log('Visit http://localhost:3000 in browser');
