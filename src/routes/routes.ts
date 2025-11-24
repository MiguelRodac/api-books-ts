import { Router } from "express";
import welcome from "./welcome.routes";
import book from "./book.routes";
import user from "./user.routes";
import auth from "./auth.routes";
import author from "./author.routes";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// ===========================================
//          Routes test conection
// ===========================================
router.get("/", welcome);
router.get("/health", welcome);
router.get("/ping", welcome);

// ===========================================
//                  Routes
// ===========================================
router.use("/auth", auth);
router.use("/authors", authMiddleware, author);
router.use("/books", authMiddleware, book);
router.use("/users", authMiddleware, user);

export default router;
