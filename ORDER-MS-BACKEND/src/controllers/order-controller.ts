import { Request, Response, NextFunction } from "express";
import { OrderDto } from "../dto/master/order-dto";
import { OrderServiceImpl } from "../services/master/impl/order-service-impl";
import { OrderItemsDto } from "../dto/master/order-items-dto";

let orderService = new OrderServiceImpl();

exports.save = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let orderDto = new OrderDto();
    let orderItemsDtoArray = [];

    console.log("From FE : ", req.body.order)

    orderDto.filViaRequest(req.body.order);

    if (Array.isArray(req.body.orderItems) && req.body.orderItems.length > 0) {
      // Fill order items into the array
      req.body.orderItems.forEach((item: any) => {
        let orderItemsDto = new OrderItemsDto();
        orderItemsDto.filViaRequest(item);
        orderItemsDtoArray.push(orderItemsDto);
      });
    } else {
      throw new Error("Order items are either not provided or are empty.");
    }

    let cr = await orderService.save(orderDto, orderItemsDtoArray);

    res.send(cr);
  } catch (error) {
    next(error);
  }
};

exports.cancel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let orderId = req.query.orderId;

    let cr = await orderService.cancel(Number(orderId));

    res.send(cr);
  } catch (error) {
    next(error);
  }
};

exports.fetchOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let cr = await orderService.fetchAllOrders();
    res.send(cr);
  } catch (error) {
    next(error);
  }
};

exports.viewOrderItem = async (req: Request, res: Response, next: NextFunction) => {
  try {

    let orderId = req.query.orderId;

    let cr = await orderService.viewOrderItem(Number(orderId));
    res.send(cr);
  } catch (error) {
    next(error);
  }
};


exports.updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let orderId = req.params.orderId;

    let cr = await orderService.updateOrderStatus(Number(orderId));

    res.send(cr);
  } catch (error) {
    next(error);
  }
};

exports.confirmOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let orderId = req.query.orderId;

    let cr = await orderService.confirmOrder(Number(orderId));

    res.send(cr);
  } catch (error) {
    next(error);
  }
};

exports.findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Reached the /order-find-all endpoint');
    let orderDto = new OrderDto();
    let orderItemsDto = new OrderItemsDto();
    orderDto.filViaRequest(req.body);
    orderItemsDto.filViaRequest(req.body);

    let cr = await orderService.find(orderDto, orderItemsDto);

    res.send(cr);
  } catch (error) {
    next(error);
  }
};
