import MongoDao from "./mongo.dao.js";
import { ProductModel } from '../models/product.model.js';

class ProductDaoMongo extends MongoDao {
    constructor(){
        super(ProductModel);
    }
};

export const prodDao = new ProductDaoMongo();

