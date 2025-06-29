
import { createRoom, deleteRoom, getRooms, getRoom } from "../controllers/roomController.js";
import verifySession from "../middlewares/verifySession.js";

import express from "express"
const router = express.Router();


router.post("/create", verifySession, createRoom);
router.post("/delete", verifySession, deleteRoom);

router.get("/list", verifySession, getRooms);
router.get("/:roomId", verifySession, getRoom)

export default router;
