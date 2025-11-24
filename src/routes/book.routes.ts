import { Router } from "express";
import { bookController } from "../controllers/book.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Book Routes
|--------------------------------------------------------------------------
| Routes for managing books in the library system.
*/
router.get("/", bookController.index); // Get all books
router.get("/:id_book", bookController.show); // Show book
router.post("/", bookController.store); // Create a new book
router.put("/:id_book", bookController.update); // Update a book
router.delete("/:id_book", bookController.destroy); // Delete a book

export default router;
