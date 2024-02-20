import express, { Router } from "express";
var orderController = require("../controllers/order-controller");

const router: Router = express.Router();

// order routes
router.post("/saveOrder", orderController.save);
router.post("/cancelOrder", orderController.cancel);
router.put("/updateOrderStatus/:orderId", orderController.updateOrderStatus);

module.exports = router;