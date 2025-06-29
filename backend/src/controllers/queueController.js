import Queue from "../models/queue.model.js";
import Room from "../models/room.model.js";
import User from "../models/user.model.js";

export const joinQueue = async (req, res) => {
  const { roomId } = req.body;
  const userEmail = req.user.email;

  if (!roomId || !userEmail) {
    return res.status(400).json({
      message: "roomId and userEmail required"
    });
  }

  try {
    const user = await User.findOne({
      email: userEmail
    });
    if (!user) return res.status(404).json({
      message: "User not found"
    });

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({
      message: "Room not found"
    });

    const existing = await Queue.findOne({
      userEmail, roomId, status: "waiting"
    });
    if (existing) {
      return res.status(200).json({
        message: "Already in queue",
        queue: existing
      });
    }

    const place = await Queue.countDocuments({ roomId, status: "waiting" }) + 1;

    const queueEntry = await Queue.create({
      userId: user._id,
      roomId,
      placeInQueue: place,
      status: "waiting"
    });

    room.usersInQueue.push(user._id);
    room.queueCount += 1;
    await room.save();

    user.currentQueues.push(queueEntry._id);
    await user.save();

    req.io.to(roomId).emit("queueUpdate", {
      message: `User ${user.name} joined the queue.`,
      queueEntry
    });

    return res.status(201).json({
      message: "Joined queue",
      queue: queueEntry
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error"
    });
  }
};

export const cancelQueue = async (req, res) => {
  const { queueId } = req.body;
  const userRole = req.user.role;
  const userId = req.user.sub;

  if (!queueId) return res.status(400).json({ message: "queueId required" });

  try {
    const queue = await Queue.findById(queueId);
    if (!queue) return res.status(404).json({ message: "Queue not found" });

    // permission
    if (
      userRole !== "admin" &&
      userRole !== "owner" &&
      userRole !== "manager" &&
      queue.userId.toString() !== userId
    ) {
      return res.status(403).json({ message: "You do not have permission" });
    }

    queue.status = "cancelled";
    await queue.save();

    // update Room
    const room = await Room.findById(queue.roomId);
    if (room) {
      room.usersInQueue = room.usersInQueue.filter(id => id.toString() !== queue.userId.toString());
      room.queueCount = Math.max(0, room.queueCount - 1);
      await room.save();
    }

    // notify
    req.io.to(queue.roomId.toString()).emit("queueUpdate", {
      message: `Queue entry cancelled by ${req.user.email}`,
      queueId: queue._id
    });

    res.status(200).json({ message: "Queue cancelled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const adjustQueuePosition = async (req, res) => {
  const { queueId, direction } = req.body;
  const userRole = req.user.role;

  if (!queueId || !direction) {
    return res.status(400).json({ message: "queueId and direction required" });
  }

  if (userRole !== "admin" && userRole !== "owner" && userRole !== "manager") {
    return res.status(403).json({ message: "Not allowed" });
  }

  try {
    const queue = await Queue.findById(queueId);
    if (!queue) return res.status(404).json({ message: "Queue not found" });

    if (direction === "up") {
      queue.placeInQueue = Math.max(1, queue.placeInQueue - 1);
    } else if (direction === "down") {
      queue.placeInQueue += 1;
    }

    await queue.save();

    req.io.to(queue.roomId.toString()).emit("queueUpdate", {
      message: `Queue position changed`,
      queue
    });

    res.status(200).json({ message: "Queue position updated", queue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getQueuesByRoom = async (req, res) => {
  const { roomId } = req.params;

  if (!roomId) {
    return res.status(400).json({ message: "roomId required" });
  }

  try {
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const queues = await Queue.find({ roomId, status: "waiting" })
      .populate('userId', 'name email profileImage')
      .sort({ placeInQueue: 1 });

    return res.status(200).json({ 
      message: "Queues fetched successfully", 
      queue: queues,
      room: room
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
