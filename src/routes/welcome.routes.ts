import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {

  res.send("<h1 style='color: blue; text-align: center;'>PONG</h1>");
});

export default router;
