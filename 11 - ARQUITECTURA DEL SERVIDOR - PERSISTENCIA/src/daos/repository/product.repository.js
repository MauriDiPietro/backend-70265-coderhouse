import factory from '../factory.js';
const { prodDao } = factory;
import ProductReqDTO from '../dtos/product/product.req.dto.js'

class ProductRepository {
    constructor(){
        this.dao = prodDao
    }

    async createProd(obj){
        try{
            const prodDTO = new ProductReqDTO(obj);
            return await this.dao.create(prodDTO);
        }catch(error){
            throw new Error(error)
        }
    }
}

export const prodRepository = new ProductRepository();