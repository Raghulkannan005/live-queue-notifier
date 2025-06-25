import WebSocket from 'ws';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { connectDB } from './src/database/db.js';

import User from '.src/models/user.model.js';
import Room from './src/models/room.model.js';
import Queue from './src/models/queue.model.js';


dotenv.config();

await connectDB();
const wss = new WebSocket.Server({ port: 8081 }, () => {
  console.log('WebSocket server running on ws://localhost:8081');
});

wss.on('connection', (ws) => {
  ws.on('message', async (msg) => {
    const data = JSON.parse(msg.toString());

    if (data.type === 'auth') {
      try {
        const decoded = jwt.verify(data.token, process.env.NEXTAUTH_SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (!user) return ws.close(4001, 'User not found');

        ws.user = user;
        ws.send(JSON.stringify({ type: 'auth_success', userId: user._id, role: user.role }));
      } catch {
        ws.close(4000, 'Invalid token');
      }
      return;
    }

    if (!ws.user) {
      ws.close(4000, 'Not authenticated');
      return;
    }

    if (data.type === 'join_queue') {
      const { roomId } = data;

      const room = await Room.findById(roomId);
      if (!room) return ws.send(JSON.stringify({ error: 'Room not found' }));

      const place = await Queue.countDocuments({ roomId, status: 'waiting' });

      const newQueue = await Queue.create({
        userId: ws.user._id,
        roomId,
        placeInQueue: place + 1,
        status: 'waiting',
      });

      ws.user.currentQueues.push(newQueue._id);
      await ws.user.save();

      room.usersInQueue.push(ws.user._id);
      room.queueCount += 1;
      await room.save();

      broadcastToRoom(roomId, {
        type: 'queue_update',
        action: 'joined',
        queue: {
          user: ws.user.name,
          userId: ws.user._id,
          queueId: newQueue._id,
          place: place + 1,
        },
      });
    }

    if (data.type === 'leave_queue') {
      const { queueId, roomId, status = 'done' } = data;

      const queue = await Queue.findById(queueId);
      if (!queue) return ws.send(JSON.stringify({ error: 'Queue not found' }));

      queue.status = status;
      await queue.save();

      const room = await Room.findById(roomId);
      if (room) {
        room.usersInQueue = room.usersInQueue.filter(
          id => id.toString() !== ws.user._id.toString()
        );
        room.queueCount -= 1;
        await room.save();
      }

      ws.user.currentQueues = ws.user.currentQueues.filter(
        id => id.toString() !== queueId
      );
      await ws.user.save();

      broadcastToRoom(roomId, {
        type: 'queue_update',
        action: 'left',
        queueId,
        userId: ws.user._id,
        status,
      });
    }
  });
});

function broadcastToRoom(roomId, message) {
  const json = JSON.stringify(message);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client.user) {
      client.send(json);
    }
  });
}
