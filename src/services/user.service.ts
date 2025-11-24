import { AppDataSource } from "../config/db/db";
import { User } from "../config/entities/user.model";
import { Logger } from "../shared/utils/logger";
import { UserCreateDTO } from "../shared/validators/user.validator";
import bcrypt from "bcrypt";

export class UserService {
  private entity = AppDataSource.getRepository(User);

  /**
   * Get all users
   */
  async getAll(): Promise<User[]> {
    try {
      return await this.entity.find();
    } catch (error) {
      Logger.error("Error in getAll Users", error);
      throw error;
    }
  }

  /**
   * Get user by ID
   * @param id - User ID
   */
  async getById(id: number): Promise<User | null> {
    try {
      return await this.entity.findOneBy({ id_user: id });
    } catch (error) {
      Logger.error("Error in getById User", error);
      throw error;
    }
  }

  /**
   * Get user by email
   * @param email - User email
   */
  async getByEmail(email: string): Promise<User | null> {
    try {
      return await this.entity.findOne({ where: { email } });
    } catch (error) {
      Logger.error("Error in getByEmail User", error);
      throw error;
    }
  }

  /**
   * Create a new user
   * @param data - User data
   */
  async create(data: UserCreateDTO): Promise<User> {
    try {
      const hashed = await bcrypt.hash(data.password, 10);
      const user = this.entity.create({ ...data, password: hashed });
      return await this.entity.save(user);
    } catch (error) {
      Logger.error("Error in create User", error);
      throw error;
    }
  }

  /**
   * Update an existing user
   * @param id - User ID
   * @param data - Partial user data
   */
  async update(id: number, data: Partial<UserCreateDTO>): Promise<User | null> {
    try {
      const user = await this.entity.findOneBy({ id_user: id });
      if (!user) return null;
      Object.assign(user, data);
      return await this.entity.save(user);
    } catch (error) {
      Logger.error("Error in update User", error);
      throw error;
    }
  }

  /**
   * Delete a user
   * @param id - User ID
   */
  async delete(id: number): Promise<boolean> {
    try {
      const result = await this.entity.delete(id);
      return result.affected !== 0;
    } catch (error) {
      Logger.error("Error in delete User", error);
      throw error;
    }
  }
}

export default new UserService();
