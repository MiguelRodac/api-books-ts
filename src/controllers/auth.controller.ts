import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { responseHandler } from "../shared/utils/handlers/responsesHandler";
import { Logger } from "../shared/utils/logger";
import { ApiError } from "../shared/utils/handlers/errorHandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id_user: number;
        email?: string;
        [key: string]: any;
      };
    }
  }
}

const serviceUser = new UserService();

export class AuthController {
  /**
   * Register a new user
   */
  async register(req: Request, res: Response) {
    try {
      const { nickname, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await serviceUser.create({
        nickname,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { id_user: user.id_user, email: user.email },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "1h" }
      );

      return responseHandler(res, {
        status: 201,
        message: "User registered successfully",
        data: { user, token },
      });
    } catch (error: any) {
      Logger.error("Error in AuthController.register", error);
      throw new ApiError(500, "Error registering user", error.message);
    }
  }

  /**
   * Login user and return JWT
   */
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await serviceUser.getByEmail(email);
      if (!user) {
        return responseHandler(res, {
          status: 401,
          error: { message: "Invalid credentials" },
        });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return responseHandler(res, {
          status: 401,
          error: { message: "Password does not match" },
        });
      }

      const token = jwt.sign(
        { id_user: user.id_user, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      return responseHandler(res, {
        status: 200,
        message: "Login successful",
        data: { token },
      });
    } catch (error: any) {
      Logger.error("Error in AuthController.login", error);
      throw new ApiError(500, "Error logging in", error.message);
    }
  }

  /**
   * Get current user
   */
  async me(req: Request, res: Response) {
    try {
      const user = await serviceUser.getById(Number(req.user?.id_user));
      return responseHandler(res, {
        status: 200,
        message: "Current user",
        data: user,
      });
    } catch (error: any) {
      Logger.error("Error in AuthController.me", error);
      throw new ApiError(500, "Error getting current user", error.message);
    }
  }

  /**
   * Refresh token
   */
  async refresh(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return responseHandler(res, {
          status: 401,
          error: { message: "Unauthorized" },
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      // Ensure decoded is an object containing id_user before accessing it
      if (
        typeof decoded === "string" ||
        decoded == null ||
        !("id_user" in decoded)
      ) {
        return responseHandler(res, {
          status: 401,
          error: { message: "Unauthorized" },
        });
      }
      const payload = decoded as { id_user: number; email?: string };
      const user = await serviceUser.getById(Number(payload.id_user));
      if (!user) {
        return responseHandler(res, {
          status: 401,
          error: { message: "Unauthorized" },
        });
      }

      const newToken = jwt.sign(
        { id_user: user.id_user, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      return responseHandler(res, {
        status: 200,
        message: "Token refreshed",
        data: { token: newToken },
      });
    } catch (error: any) {
      Logger.error("Error in AuthController.refresh", error);
      throw new ApiError(500, "Error refreshing token", error.message);
    }
  }

  /**
   * Logout user
   */
  async logout(_req: Request, res: Response) {
    try {
      return responseHandler(res, {
        status: 200,
        message: "Logout successful",
      });
    } catch (error: any) {
      Logger.error("Error in AuthController.logout", error);
      throw new ApiError(500, "Error logging out", error.message);
    }
  }
}

export const authController = new AuthController();
