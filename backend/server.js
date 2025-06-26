import express from 'express';
import http from "http";
import {Server} from "socket.io"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { connectDB } from './src/database/db.js';

import User from './src/models/user.model.js';
import Room from './src/models/room.model.js';
import Queue from './src/models/queue.model.js';

dotenv.config();

await connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const PORT = process.env.PORT || 5000;

const clients = []

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  clients.push(socket.id);

  socket.on('message', (msg) => {
    console.log('Message:', msg);
    clients.forEach(clientId => {
      io.to(clientId).emit('message', `New message: ${msg} \n No. of clients: ${clients.length}`);
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/welcome.html");
});

app.get("/test", (req, res) => {
  res.json({ message: "Test endpoint working" });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



