import express from "express"
const router = express.Router();


import {
  joinQueue,
  cancelQueue,
  adjustQueuePosition,
  getQueuesByRoom
} from "../controllers/queueController.js";
import verifySession from "../middlewares/verifySession.js";

router.post("/join", verifySession, joinQueue);
router.post("/cancel", verifySession, cancelQueue);
router.post("/adjust-position", verifySession, adjustQueuePosition);
router.get("/room/:roomId", verifySession, getQueuesByRoom);

export default router;
