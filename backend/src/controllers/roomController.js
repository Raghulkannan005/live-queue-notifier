import Room from "../models/room.model.js";
import Queue from "../models/queue.model.js";
import User from "../models/user.model.js";

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

    const ownRoom = await User.findByIdAndUpdate(
      createdBy,
      { $push: { roomsOwned: createdRoom._id } },
      { new: true }
    );

    res.status(201).json({ message: "Room created", data : createdRoom });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteRoom = async (req, res) => {
  const { roomId } = req.params;
  const userRole = req.user.role;
  const userId = req.user.id;

  if (!roomId) return res.status(400).json({ message: "roomId required" });

  try {
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    if (userRole !== "admin" && room.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "You don't have permission to delete this room" });
    }

    await Queue.deleteMany({ roomId });

    await Room.findByIdAndDelete(roomId);

    await User.findByIdAndUpdate(
      room.createdBy,
      { $pull: { roomsOwned: roomId } }
    );

    res.status(200).json({ message: "Room deleted successfully" });
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

    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ message: "No rooms found" });
    }

    res.status(200).json({ message: "Rooms fetched", data: rooms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const editRoom = async (req, res) => {
  const { roomId } = req.params;
  const { name, description } = req.body;
  const userRole = req.user.role;
  const userId = req.user.id;

  if (!roomId) return res.status(400).json({ message: "roomId required" });

  try {
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    // Check if user has permission to edit this room
    if (userRole !== "admin" && room.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "You don't have permission to edit this room" });
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { name, description },
      { new: true }
    );

    res.status(200).json({ message: "Room updated", data: updatedRoom });
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

export const getOwnedRooms = async (req, res) => {
  const userId = req.user.id;

  try {
    const rooms = await Room.find({ createdBy: userId })
      .populate("createdBy", "name image email")
      .sort({ createdAt: -1 });
    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ message: "No owned rooms found" });
    }
    res.status(200).json({ message: "Owned rooms fetched", data: rooms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};