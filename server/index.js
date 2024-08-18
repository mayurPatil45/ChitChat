const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')
const socket = require('socket.io')
const path = require('path')

const app = express();
require('dotenv').config()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

connectDB();

app.use('/api/auth', userRoutes);
app.use('/api/message', messageRoutes);

app.use('/', (req, res) => {
    res.send("Hello World");
})

const io = socket(server, {
    cors: {
        origin: 'http://localhost:5173/',
        credentials: true
    }
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;

    socket.on('addUser', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on('message-send', (message) => {
        const { from, to, text } = message;
        const toSocketId = onlineUsers.get(to);
        if (toSocketId) {
            socket.to(toSocketId).emit('message-recieve', { text, from });
        }
    });
});