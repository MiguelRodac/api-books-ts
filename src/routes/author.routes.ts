import { Router } from "express";
import { authorController } from "./../controllers/author.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Author Routes
|--------------------------------------------------------------------------
| Routes for managing authors in the library system.
*/
router.get("/", authorController.index); // Get all authors
router.get("/:id_author", authorController.show); // Show author
router.post("/", authorController.store); // Create a new author
router.put("/:id_author", authorController.update); // Update an author
router.delete("/:id_author", authorController.destroy); // Delete an author

export default router;
