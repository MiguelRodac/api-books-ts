import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

/**
 * |--------------------------------------------------------------------------
 * | Auth Routes
 * |--------------------------------------------------------------------------
 * Routes for managing authentication in the system.
 */
router.post("/register", authController.register); // Register a new user
router.post("/login", authController.login); // Login user
router.get("/me", authMiddleware, authController.me); // Get current user
router.get("/refresh", authMiddleware, authController.refresh); // Refresh token
router.post("/logout", authMiddleware, authController.logout); // Logout user

export default router;
