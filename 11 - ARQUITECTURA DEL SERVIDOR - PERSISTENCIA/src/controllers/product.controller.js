import { prodService } from "../services/product.service.js";
import Controllers from "./controller.manager.js";

class ProductController extends Controllers {
  constructor() {
    super(prodService);
  }

  createProd = async (req, res, next) => {
    try {
      const newProd = await this.service.createProd(req.body)
      res.json(newProd)
    } catch (error) {
      next(error);
    }
  };
}

export const prodController = new ProductController();
