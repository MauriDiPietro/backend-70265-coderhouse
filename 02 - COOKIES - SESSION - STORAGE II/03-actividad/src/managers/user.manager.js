import { UserModel } from "../models/user.model.js";

class UserManager {
  constructor(model) {
    this.model = model;
  }
  async register(user) {
    try {
      const { email } = user;
      const exists = await this.getByEmail(email);
      if (!exists) return await this.model.create(user);
      return null;
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
      return await this.model.findOne({email, password});
    } catch (error) {
      throw new Error(error);
    }
  }
}

const userManager = new UserManager(UserModel);
export default userManager;
