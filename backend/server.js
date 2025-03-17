const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

let password = process.env.PASSWORD || 'HXM';
let kartCount = 50;
let laneColors = ['red', 'blue', 'white', 'yellow'];
let karts = initializeKarts();

function initializeKarts() {
    const initialKarts = [];
    for (let i = 1; i <= kartCount; i++) {
        initialKarts.push({
            id: i,
            performance: 'None',
            lane: -1,
        });
    }
    return initialKarts;
}

function updateKarts(updatedKarts) {
    karts = updatedKarts;
    io.emit('state', karts);
}

io.on('connection', (socket) => {
    socket.emit('state', karts);

    socket.on('updateKarts', (updatedKarts) => {
        updateKarts(updatedKarts);
    });

    socket.on('settings', ({ kartCount: newKartCount, laneColors: newLaneColors, password: newPassword }) => {
        kartCount = newKartCount;
        laneColors = newLaneColors;
        password = newPassword;
        karts = initializeKarts();
        updateKarts(karts);
        io.emit('laneColors', laneColors);
    });

    socket.on('verifyPassword', (clientPassword, callback) => {
        if (clientPassword === password) {
            callback(true);
        } else {
            callback(false);
        }
    });

    socket.on('laneColorsRequest', () => {
        socket.emit('laneColors', laneColors);
    });
});

server.listen(5089, () => {
    console.log('Server listening on port 5089');
});