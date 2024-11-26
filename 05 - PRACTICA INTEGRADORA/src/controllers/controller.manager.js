export default class Controllers {
  constructor(service) {
    this.service = service;
  }

  async getAll(req, res, next) {
    try {
      const response = await this.service.getAll();
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const response = await this.service.getById(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      const response = await this.service.create(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const response = await this.service.update(id, req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const response = await this.service.delete(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
