import { Router } from "express";
import { Logger } from "../shared/utils/logger";
import book from "./book.routes";
import user from "./user.routes";
import auth from "./auth.routes";
import author from "./author.routes";

const router = Router();

// ===========================================
//          Routes test conection
// ===========================================
/**
 * Health Check
 * @returns status: 'OK'
 */
router.get("/health", (req: any, res: any) => {
  Logger.info(
    `Someone with IP: ${
      req.ip
    }, trying to connect to our API Rest - ${new Date().toLocaleDateString()} - ${new Date()
      .toLocaleTimeString()
      .replace(/:\d{2}\.\d{3}Z$/, "")}`
  );

  res.status(200).json({ status: "OK" });
});

/**
 * Ping pong conection
 * @returns html - PONG
 */
router.get("/ping", (_req: any, res: any) => {
  Logger.info(
    "Someone is requesting the ping " +
      new Date().toLocaleDateString() +
      " " +
      new Date().toLocaleTimeString().replace(/:\d{2}\.\d{3}Z$/, "")
  );
  res
    .status(200)
    .send(
      '<h1 style="background-color: #000; color: blue; font-size: 50px; text-align: center; display: flex; justify-content: center; align-items: center; font-family: Arial, Helvetica, sans-serif; margin: auto; padding: 0rem; width: 100%; height: 100%;">PONG</h1>'
    );
});

// ===========================================
//                  Routes
// ===========================================
router.use("/auth", auth);
router.use("/authors", author);
router.use("/books", book);
router.use("/users", user);

export default router;
