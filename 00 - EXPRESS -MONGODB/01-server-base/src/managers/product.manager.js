import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getAll() {
    try {
      if (fs.existsSync(this.path)) {
        const users = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(users);
      } else return [];
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      const product = {
        id: uuidv4(),
        ...obj,
      };
      const products = await this.getAll();
      const productExist = await this.getById(product.id);
      if (productExist) return null;
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const products = await this.getAll();
      const productExist = products.find((p) => p.id === id);
      if (!productExist) throw new Error('Product Not Found');
      return productExist;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(obj, id) {
    try {
      const products = await this.getAll();
      let productExist = await this.getById(id);
      if (!productExist) return null;
      productExist = { ...productExist, ...obj };
      const newArray = products.filter((u) => u.id !== id);
      newArray.push(productExist);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return productExist;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    const products = await this.getAll();
    if (products.length > 0) {
      const productExist = await this.getById(id);
      if (productExist) {
        const newArray = products.filter((u) => u.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newArray));
        return productExist;
      }
    } else return null;
  }

  async deleteAll() {
    try {
      await fs.promises.unlink(this.path);
    } catch (error) {
      throw new Error(error);
    }
  }
}

const prodManager = new ProductManager(
  path.join(process.cwd(), "/src/data/products.json")
);
export default prodManager;
