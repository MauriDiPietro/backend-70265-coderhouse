import { UserModel } from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/utils.js";

class UserManager {
  constructor(model) {
    this.model = model;
  }
  async register(user) {
    try {
      const { email, password } = user;
      const exists = await this.getByEmail(email);
      if(exists) throw new Error('User already registered')
      if (!exists) return await this.model.create({
        ...user,
        password: createHash(password)
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByEmail(email) {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(email, password) {
    try {
      const userExists = await this.getByEmail(email);
      if(!userExists) throw new Error('User not found');
      const passValid = isValidPassword(password, userExists);
      if(!passValid) throw new Error('Invalid credentials');
      return userExists;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const userManager = new UserManager(UserModel);
export default userManager;
