import { Router } from "express";
import prodManager from "../managers/product.manager.js";
const router = Router();

router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const response = await prodManager.create(req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    // res.send('hola')
    // res.json({ nombre: "Juan" });
    // res.redirect('/')
    // res.render('plantilla')
    // res.status(404).json({msg: 'Error'})
    // throw new Error('Error loading')
    // console.log(req.query);
    const products = await prodManager.getAll();
    const { value } = req.query;
    const prodFilter = products.filter((p) => p.price < parseInt(value));
    if (!value) return res.json(products);
    res.json(prodFilter);
    // PRECIO MENOR A: ___ |BUSCAR| --> GET /products
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const prod = await prodManager.getById(id);
    res.json(prod);
  } catch (error) {
    next(error);
  }
});

export default router;
