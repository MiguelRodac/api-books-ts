import { Request, Response } from "express";
import { AuthorService } from "../services/author.service";
import { responseHandler } from "../shared/utils/handlers/responsesHandler";
import {
  AuthorSchema,
  AuthorUpdateSchema,
} from "../shared/validators/author.validator";
import { Logger } from "../shared/utils/logger";
import { ApiError } from "../shared/utils/handlers/errorHandler";

const serviceAuthor = new AuthorService();

export class AuthorController {
  /**
   * Get all authors
   * @param _req
   * @param res
   * @returns authors: Author[]
   */
  async index(_req: Request, res: Response) {
    try {
      const authors = await serviceAuthor.getAll();
      return responseHandler(res, {
        status: 200,
        message: "List of authors",
        data: authors,
      });
    } catch (error: any) {
      Logger.error("Error in AuthorController.index", error);
      throw new ApiError(500, "Error fetching authors", error.message);
    }
  }

  /**
   * Show author by ID
   * @param req
   * @param res
   * @returns author: Author
   */
  async show(req: Request, res: Response) {
    try {
      const author = await serviceAuthor.getById(Number(req.params.id_author));
      if (!author) {
        return responseHandler(res, {
          status: 404,
          error: { message: "Author not found" },
        });
      }
      return responseHandler(res, {
        status: 200,
        message: "Author found",
        data: author,
      });
    } catch (error: any) {
      Logger.error("Error in AuthorController.show", error);
      throw new ApiError(500, "Error fetching author", error.message);
    }
  }

  /**
   * Create a new author
   * @param req
   * @param res
   * @returns author: Author
   */
  async store(req: Request, res: Response) {
    try {
      const parsed = AuthorSchema.safeParse(req.body);
      if (!parsed.success) {
        return responseHandler(res, {
          status: 422,
          error: { message: "Validation failed", data: parsed.error },
        });
      }
      const author = await serviceAuthor.create(parsed.data);
      return responseHandler(res, {
        status: 201,
        message: "Author created",
        data: author,
      });
    } catch (error: any) {
      Logger.error("Error in AuthorController.store", error);
      throw new ApiError(500, "Error creating author", error.message);
    }
  }

  /**
   * Update an existing author
   * @param req
   * @param res
   * @returns author: Author
   */
  async update(req: Request, res: Response) {
    try {
      const parsed = AuthorUpdateSchema.safeParse(req.body);
      if (!parsed.success) {
        return responseHandler(res, {
          status: 422,
          error: { message: "Validation failed", data: parsed.error },
        });
      }
      const author = await serviceAuthor.update(
        Number(req.params.id_author),
        parsed.data
      );
      if (!author) {
        return responseHandler(res, {
          status: 404,
          error: { message: "Author not found" },
        });
      }
      return responseHandler(res, {
        status: 200,
        message: "Author updated",
        data: author,
      });
    } catch (error: any) {
      Logger.error("Error in AuthorController.update", error);
      throw new ApiError(500, "Error updating author", error.message);
    }
  }

  /**
   * Delete an author
   * @param req
   * @param res
   */
  async destroy(req: Request, res: Response) {
    try {
      const deleted = await serviceAuthor.delete(Number(req.params.id_author));
      if (!deleted) {
        return responseHandler(res, {
          status: 404,
          error: { message: "Author not found" },
        });
      }
      return responseHandler(res, { status: 204, message: "Author deleted" });
    } catch (error: any) {
      Logger.error("Error in AuthorController.destroy", error);
      throw new ApiError(500, "Error deleting author", error.message);
    }
  }
}

export const authorController = new AuthorController();
