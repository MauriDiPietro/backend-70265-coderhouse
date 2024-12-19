export default class Controllers {
  constructor(service) {
    this.service = service;
  }

  getAll = async(req, res, next)=> {
    try {
      const response = await this.service.getAll();
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  getById = async(req, res, next)=> {
    try {
      const { id } = req.params;
      const response = await this.service.getById(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  create = async(req, res, next) =>{
    try {
      const response = await this.service.create(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  update = async(req, res, next)=> {
    try {
      const { id } = req.params;
      const response = await this.service.update(id, req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  delete = async(req, res, next)=> {
    try {
      const { id } = req.params;
      const response = await this.service.delete(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
