import { Request, Response } from "express";

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({
    status: 404,
    message: "Endpoint not found",
  });
}
