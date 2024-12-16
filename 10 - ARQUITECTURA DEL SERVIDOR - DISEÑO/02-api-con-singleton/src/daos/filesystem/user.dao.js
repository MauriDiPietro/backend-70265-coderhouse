import FSDao from "./fs.dao.js";
const path = "./users.json";
import fs from 'fs'

class UserDaoFS extends FSDao {
  constructor() {
    super(path)
  }

  async #getMaxId() {
    let maxId = 0;
    const items = await this.getAll();
    items.map((item) => {
      if (item.id > maxId) maxId = item.id;
    });
    return maxId;
  }

  async register(obj) {
    try {
      const item = {
        id: (await this.#getMaxId()) + 1,
        ...obj,
      };
      const itemsFile = await this.getAll();
      itemsFile.push(item);
      await fs.promises.writeFile(this.path, JSON.stringify(itemsFile));
      return item;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByEmail(email) {
    try {
      const itemsFile = await this.getAll();
      return itemsFile.find((user)=>user.email === email);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const userDaoFS = new UserDaoFS();
