import Room from "../models/room.model.js";
import Queue from "../models/queue.model.js";

export const createRoom = async (req, res) => {
  const { name, description } = req.body;

  const creator = req.user;
  const createdBy = creator.id;

  if (!name) return res.status(400).json({ message: "Room name required" });

  try {
    const createdRoom = await Room.create({
      name,
      description,
      createdBy
    });

    res.status(201).json({ message: "Room created", data : createdRoom });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteRoom = async (req, res) => {
  const { roomId } = req.body;
  const userRole = req.user.role;

  if (!roomId) return res.status(400).json({ message: "roomId required" });

  if (userRole !== "admin" && userRole !== "owner") {
    return res.status(403).json({ message: "Not allowed" });
  }

  try {
    await Room.findByIdAndDelete(roomId);
    await Queue.deleteMany({ roomId });
    res.status(200).json({ message: "Room deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRooms = async (req, res) => {

  try {
    const rooms = await Room.find()
      .populate("createdBy", "name image email")
      .sort({ createdAt: -1 });
    res.status(200).json({ message: "Rooms fetched", data : rooms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRoom = async (req, res) => {
  const { roomId } = req.params;

  if (!roomId) return res.status(400).json({ message: "roomId required" });

  try {
    const room = await Room.findById(roomId)
      .populate("createdBy", "name image email")
      .lean();

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ message: "Room fetched", data: room });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};