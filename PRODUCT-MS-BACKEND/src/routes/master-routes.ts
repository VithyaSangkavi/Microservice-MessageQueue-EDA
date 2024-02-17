import express, { Router } from "express";
var productController = require("../controllers/product-controller");

const auth = require("../middleware/auth-middleware");
const router: Router = express.Router();
// add authentication middleware
//router.use(auth);

// product routes
router.post("/product-save", productController.save);
router.post("/product-update", productController.update);
router.post("/product-delete", productController.delete);
router.get("/product-find-all", productController.findAll);
router.get("/product-find-by-id", productController.findById);
router.put('/product-decrease', productController.decreaseQuantity);
router.put('/product-increase/:uuid', productController.increaseQuantity);

module.exports = router;
