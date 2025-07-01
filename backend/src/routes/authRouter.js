import express from 'express';
const router = express.Router();
import { googleLogin, getRole, verifyToken, refreshToken } from '../controllers/authController.js';
import { googleLoginSchema, getRoleSchema } from '../validation/auth.js';
import { validateBody } from '../validation/validateBody.js';

router.post(
  "/google-login",
  validateBody(googleLoginSchema),
  googleLogin
);
router.post(
  "/get-role",
  validateBody(getRoleSchema),
  getRole
);
router.get("/verify-token", verifyToken);
router.post("/refresh-token", refreshToken);

export default router;