import express from 'express';
import http from "http";
import https from "https";
import {Server} from "socket.io"
import dotenv from 'dotenv';

import { connectDB } from './src/database/db.js';
import job from './src/lib/cron.js';

dotenv.config();

const url = process.env.API_URL
const client = url.startsWith('https') ? https : http;

await connectDB();
job.start();

const app = express();
const server = client.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const PORT = process.env.PORT || 5000;

let clients = []

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  clients.push(socket.id);
  io.emit('message', `User ${socket.id} has connected. No. of clients: ${clients.length}`);

  socket.on('message', (msg) => {
    console.log('Message:', msg);
    clients.forEach(clientId => {
      io.to(clientId).emit('message', `${msg} Sent to ${clients.length} clients`);
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    clients = clients.filter(id => id !== socket.id);
    io.emit('message', `User ${socket.id} has disconnected. No. of clients: ${clients.length}`);
  });
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/welcome.html");
});

app.get("/test", (req, res) => {
  res.json({ message: "Test endpoint working" });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



