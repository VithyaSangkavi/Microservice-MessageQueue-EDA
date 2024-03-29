import express, { Router } from "express";
var orderController = require("../controllers/order-controller");
var orderItemsController = require("../controllers/order-items-controller");

const router: Router = express.Router();

// order routes
router.post("/saveOrder", orderController.save);
router.post("/cancelOrder", orderController.cancel);
router.get("/fetchOrder", orderController.fetchOrders);
router.get("/viewOrderItem", orderController.viewOrderItem);

router.put("/updateOrderStatus/:orderId", orderController.updateOrderStatus);
router.post("/confirmOrder", orderController.confirmOrder);
router.get("/fetchOrder", orderController.cancel);
router.get("/order-find-all", orderController.findAll);


//order-items routes
// router.post("/saveOrderItems", orderItemsController.save);

module.exports = router;