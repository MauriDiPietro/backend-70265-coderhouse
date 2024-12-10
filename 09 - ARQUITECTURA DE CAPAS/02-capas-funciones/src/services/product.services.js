import persistence from "../daos/persistence.js";
const { prodDao } = persistence;

export const create = async(prod) => {
    try {
       return await prodDao.create(prod);
    } catch (error) {
        throw new Error(error)
    }
}
