export default class Services {
  constructor(dao) {
    this.dao = dao;
  }
  async getAll() {
    try {
      const response = await this.dao.getAll();
      if (!response) throw new Error("Error get all");
      return response;
    } catch (error) {
      throw error;
    }
  }
  async create(obj) {
    try {
      const response = await this.dao.create(obj);
      if (!response) throw new Error("Error create");
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async update(id, obj) {
    try {
      const response = await this.dao.update(id, obj);
      if (!response) throw new Error("Error update");
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async delete(id) {
    try {
      const response = await this.dao.delete(id);
      if (!response) throw new Error("Error delete");
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getById(id) {
    try {
      const response = await this.dao.getById(id);
      if (!response) throw new Error("Error getById");
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
