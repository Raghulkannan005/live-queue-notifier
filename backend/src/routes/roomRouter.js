
import { createRoom, deleteRoom, getRooms, getRoom } from "../controllers/roomController.js";
import verifySession from "../middlewares/verifySession.js";
import roleCheck from "../middlewares/roleCheck.js";

import express from "express"
const router = express.Router();


router.get("/list", verifySession, getRooms);
router.get("/:roomId", verifySession, getRoom);

router.post("/create", verifySession, roleCheck(["owner", "admin"]), createRoom);
router.post("/delete", verifySession, roleCheck(["owner", "admin"]), deleteRoom);

export default router;
