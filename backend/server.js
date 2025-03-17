const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

console.log('Server starting...');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

console.log('HTTP server created...');

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        transports: ['websocket']
    },
});

console.log('Socket.IO server initialized...');

let password = process.env.PASSWORD || 'HXM';
let kartCount = 10;
let laneColors = ['red', 'blue', 'white', 'yellow'];
let karts = {};
let lanes = [[], [], [], []];
let waitingLane = [];

function initializeKarts() {
    console.log('Initializing karts...');
    karts = {};
    for (let i = 1; i <= kartCount; i++) {
        karts[i] = { number: i, performance: 'None' };
    }
    console.log('Karts initialized.');
}

initializeKarts();

io.on('connection', (socket) => {
    console.log('User connected', socket.id, socket.id); // Ajouté socket.id
    socket.on('error', (error) => {
        console.error('Socket.IO connection error:', error);
    });

    socket.on('disconnect', (reason) => {
        console.log('User disconnected', socket.id, reason);
    });

    socket.emit('state', { password, kartCount, laneColors, karts, lanes, waitingLane });

    socket.on('login', (providedPassword) => {
        console.log('Login attempt', providedPassword);
        if (providedPassword === password) {
            socket.emit('loginSuccess', { password, kartCount, laneColors, karts, lanes, waitingLane });
            console.log('Login success');
        } else {
            socket.emit('loginFailure');
            console.log('Login failure');
        }
    });

    socket.on('updateSettings', ({ newPassword, newKartCount, newLaneColors }) => {
        console.log('Updating settings...');
        password = newPassword;
        kartCount = newKartCount;
        laneColors = newLaneColors;
        initializeKarts();
        lanes = [[], [], [], []];
        waitingLane = [];
        io.emit('state', { password, kartCount, laneColors, karts, lanes, waitingLane });
        console.log('Settings updated.');
    });

    socket.on('addKartToLane', ({ kartNumber, laneIndex }) => {
        console.log(`Adding kart ${kartNumber} to lane ${laneIndex}...`);
        lanes[laneIndex].push(karts[kartNumber]);
        io.emit('state', { password, kartCount, laneColors, karts, lanes, waitingLane });
        console.log(`Kart ${kartNumber} added to lane ${laneIndex}.`);
    });

    socket.on('removeKartFromLane', ({ kartNumber, laneIndex }) => {
        console.log(`Removing kart ${kartNumber} from lane ${laneIndex}...`);
        lanes[laneIndex] = lanes[laneIndex].filter((kart) => kart.number !== kartNumber);
        io.emit('state', { password, kartCount, laneColors, karts, lanes, waitingLane });
        console.log(`Kart ${kartNumber} removed from lane ${laneIndex}.`);
    });

    socket.on('addKartToWaiting', (kartNumber) => {
        console.log(`Adding kart ${kartNumber} to waiting lane...`);
        waitingLane.push(karts[kartNumber]);
        io.emit('state', { password, kartCount, laneColors, karts, lanes, waitingLane });
        console.log(`Kart ${kartNumber} added to waiting lane.`);
    });

    socket.on('removeKartFromWaiting', (kartNumber) => {
        console.log(`Removing kart ${kartNumber} from waiting lane...`);
        waitingLane = waitingLane.filter((kart) => kart.number !== kartNumber);
        io.emit('state', { password, kartCount, laneColors, karts, lanes, waitingLane });
        console.log(`Kart ${kartNumber} removed from waiting lane.`);
    });

    socket.on('updateKartPerformance', ({ kartNumber, performance }) => {
        console.log(`Updating kart ${kartNumber} performance to ${performance}...`);
        karts[kartNumber].performance = performance;
        io.emit('state', { password, kartCount, laneColors, karts, lanes, waitingLane });
        console.log(`Kart ${kartNumber} performance updated.`);
    });

    socket.on('disconnect', (reason) => {
        console.log('User disconnected', socket.id, reason); // Ajouté la raison de la deconnexion
    });
});

const PORT = process.env.PORT || 5089; // Ajouté la variable port pour être sur de prendre la bonne
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));