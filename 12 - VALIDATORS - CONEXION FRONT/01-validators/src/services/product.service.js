import Services from "./service.manager.js";
import factory from "../daos/factory.js";
const { prodDao } = factory;
import { prodRepository } from "../daos/repository/product.repository.js";

class ProductService extends Services {
  constructor() {
    super(prodDao);
  }

  createProd = async (obj) => {
    try {
      return await prodRepository.createProd(obj);
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const prodService = new ProductService();
