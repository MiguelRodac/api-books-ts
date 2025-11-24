import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { responseHandler } from "../shared/utils/handlers/responsesHandler";
import {
  UserSchema,
  UserUpdateSchema,
} from "../shared/validators/user.validator";
import { Logger } from "../shared/utils/logger";
import { ApiError } from "../shared/utils/handlers/errorHandler";

const serviceUser = new UserService();

export class UserController {
  /**
   * Get all users
   * @param _req
   * @param res
   * @returns users: User[]
   */
  async index(_req: Request, res: Response) {
    try {
      const users = await serviceUser.getAll();
      return responseHandler(res, {
        status: 200,
        message: "List of users",
        data: users,
      });
    } catch (error: any) {
      Logger.error("Error in UserController.index", error);
      throw new ApiError(500, "Error al obtener los usuarios", error.message);
    }
  }

  /**
   * Show user by ID
   * @param req
   * @param res
   * @returns user: User
   */
  async show(req: Request, res: Response) {
    try {
      const user = await serviceUser.getById(Number(req.params.id_user));
      if (!user) {
        return responseHandler(res, {
          status: 404,
          error: { message: "User not found" },
        });
      }
      return responseHandler(res, {
        status: 200,
        message: "User found",
        data: user,
      });
    } catch (error: any) {
      Logger.error("Error in UserController.show", error);
      throw new ApiError(500, "Error al obtener el usuario", error.message);
    }
  }

  /**
   * Create a new user
   * @param req
   * @param res
   * @returns user: User
   */
  async store(req: Request, res: Response) {
    try {
      const parsed = UserSchema.safeParse(req.body);
      if (!parsed.success) {
        return responseHandler(res, {
          status: 422,
          error: { message: "Validation failed", data: parsed.error.message },
        });
      }
      const user = await serviceUser.create(parsed.data);
      return responseHandler(res, {
        status: 201,
        message: "User created",
        data: user,
      });
    } catch (error: any) {
      Logger.error("Error in UserController.store", error);
      throw new ApiError(500, "Error al crear el usuario", error.message);
    }
  }

  /**
   * Update an existing user
   * @param req
   * @param res
   * @returns user: User
   */
  async update(req: Request, res: Response) {
    try {
      const parsed = UserUpdateSchema.safeParse(req.body);
      if (!parsed.success) {
        return responseHandler(res, {
          status: 422,
          error: { message: "Validation failed", data: parsed.error },
        });
      }
      const user = await serviceUser.update(
        Number(req.params.id_user),
        parsed.data
      );
      if (!user) {
        return responseHandler(res, {
          status: 404,
          error: { message: "User not found" },
        });
      }
      return responseHandler(res, {
        status: 200,
        message: "User updated",
        data: user,
      });
    } catch (error: any) {
      Logger.error("Error in UserController.update", error);
      throw new ApiError(500, "Error al actualizar el usuario", error.message);
    }
  }

  /**
   * Delete a user
   * @param req
   * @param res
   */
  async destroy(req: Request, res: Response) {
    try {
      const deleted = await serviceUser.delete(Number(req.params.id_user));
      if (!deleted) {
        return responseHandler(res, {
          status: 404,
          error: { message: "User not found" },
        });
      }
      return responseHandler(res, { status: 204, message: "User deleted" });
    } catch (error: any) {
      Logger.error("Error in UserController.destroy", error);
      throw new ApiError(500, "Error al eliminar el usuario", error.message);
    }
  }
}

export const userController = new UserController();
