import { Router } from "express";
import { prodController } from "../controllers/product.controller.js";

const router = Router();

router.get("/", prodController.getAll);
router.get("/:id", prodController.getById);
router.post("/", prodController.create);
router.post("/dto", prodController.createProd);
router.put("/:id", prodController.update);
router.delete("/:id", prodController.delete);

export default router;
