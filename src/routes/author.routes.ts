import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.send({ message: "Author route works!" });
});

export default router;
