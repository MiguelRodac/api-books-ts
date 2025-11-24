import { Router } from "express";
import { userController } from "../controllers/user.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
| Routes for managing users in the system.
*/
router.get("/", userController.index); // Get all users
router.get("/:id_user", userController.show); // Show user
router.post("/", userController.store); // Create a new user
router.put("/:id_user", userController.update); // Update a user
router.delete("/:id_user", userController.destroy); // Delete a user

export default router;
