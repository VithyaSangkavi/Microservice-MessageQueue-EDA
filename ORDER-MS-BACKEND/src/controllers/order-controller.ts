import { Request, Response, NextFunction } from 'express';
import { OrderDto } from '../dto/master/order-dto';
import { OrderServiceImpl } from '../services/master/impl/order-service-impl';
import { OrderItemsDto } from '../dto/master/order-items-dto';

let orderService = new OrderServiceImpl(); 

exports.save = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let orderDto = new OrderDto();
    let orderItemsDto = new OrderItemsDto();

    orderDto.filViaRequest(req.body);
    orderItemsDto.filViaRequest(req.body);

    let cr = await orderService.save(orderDto, orderItemsDto);

    res.send(cr);
  } catch (error) {
    next(error);
  }
};

exports.cancel = async (req: Request, res: Response, next: NextFunction) => {
  try{
    let orderId = req.query.orderId;

    let cr = await orderService.cancel(Number(orderId));

    res.send(cr);
  } catch (error) {
    next (error);
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
  try{
    let orderId = req.query.orderId;

    let cr = await orderService.confirmOrder(Number(orderId));

    res.send(cr);
  } catch (error) {
    next (error);
  }
};
