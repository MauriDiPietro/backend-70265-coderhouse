import { Router } from "express";
const router = Router();
import * as controllers from '../controllers/product.controller.js'

router.post("/", controllers.createProduct);

router.get("/", controllers.getAllProducts);

router.get("/:id", controllers.getProdById);

export default router;
