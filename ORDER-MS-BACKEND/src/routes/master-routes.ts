import express, { Router } from "express";
var orderController = require("../controllers/order-controller");
var orderItemsController = require("../controllers/order-items-controller");

const router: Router = express.Router();

// order routes
router.post("/saveOrder", orderController.save);

//order-items routes
router.post("/saveOrderItems", orderItemsController.save);


module.exports = router;
