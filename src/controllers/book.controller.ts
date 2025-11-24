import { Request, Response } from "express";
import { BookService } from "../services/book.service";
import { responseHandler } from "../shared/utils/handlers/responsesHandler";
import {
  BookSchema,
  BookUpdateSchema,
} from "../shared/validators/book.validator";
import { Logger } from "../shared/utils/logger";
import { ApiError } from "../shared/utils/handlers/errorHandler";

const serviceBook = new BookService();

export class BookController {
  /**
   * Get all books
   * @param _req
   * @param res
   * @returns books: Book[]
   */
  async index(_req: Request, res: Response) {
    try {
      const books = await serviceBook.getAll();
      return responseHandler(res, {
        status: 200,
        message: "List of books",
        data: books,
      });
    } catch (error: any) {
      Logger.error("Error in BookController.index", error);
      throw new ApiError(500, "Error fetching books", error.message);
    }
  }

  /**
   * Show book by ID
   * @param req
   * @param res
   * @returns book: Book
   */
  async show(req: Request, res: Response) {
    try {
      const book = await serviceBook.getById(Number(req.params.id_book));
      if (!book) {
        return responseHandler(res, {
          status: 404,
          error: { message: "Book not found" },
        });
      }
      return responseHandler(res, {
        status: 200,
        message: "Book found",
        data: book,
      });
    } catch (error: any) {
      Logger.error("Error in BookController.show", error);
      throw new ApiError(500, "Error fetching book", error.message);
    }
  }

  /**
   * Create a new book
   * @param req
   * @param res
   * @returns book: Book
   */
  async store(req: Request, res: Response) {
    try {
      const parsed = BookSchema.safeParse(req.body);
      if (!parsed.success) {
        return responseHandler(res, {
          status: 422,
          error: { message: "Validation failed", data: parsed.error },
        });
      }
      const book = await serviceBook.create(parsed.data);
      return responseHandler(res, {
        status: 201,
        message: "Book created",
        data: book,
      });
    } catch (error: any) {
      Logger.error("Error in BookController.store", error);
      throw new ApiError(500, "Error creating book", error.message);
    }
  }

  /**
   * Update an existing book
   * @param req
   * @param res
   * @returns book: Book
   */
  async update(req: Request, res: Response) {
    try {
      const parsed = BookUpdateSchema.safeParse(req.body);
      if (!parsed.success) {
        return responseHandler(res, {
          status: 422,
          error: { message: "Validation failed", data: parsed.error },
        });
      }
      const book = await serviceBook.update(
        Number(req.params.id_book),
        parsed.data
      );
      if (!book) {
        return responseHandler(res, {
          status: 404,
          error: { message: "Book not found" },
        });
      }
      return responseHandler(res, {
        status: 200,
        message: "Book updated",
        data: book,
      });
    } catch (error: any) {
      Logger.error("Error in BookController.update", error);
      throw new ApiError(500, "Error updating book", error.message);
    }
  }

  /**
   * Delete a book
   * @param req
   * @param res
   */
  async destroy(req: Request, res: Response) {
    try {
      const deleted = await serviceBook.delete(Number(req.params.id_book));
      if (!deleted) {
        return responseHandler(res, {
          status: 404,
          error: { message: "Book not found" },
        });
      }
      return responseHandler(res, { status: 204, message: "Book deleted" });
    } catch (error: any) {
      Logger.error("Error in BookController.destroy", error);
      throw new ApiError(500, "Error deleting book", error.message);
    }
  }
}

export const bookController = new BookController();
