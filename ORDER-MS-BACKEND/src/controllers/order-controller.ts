import { Request, Response, NextFunction } from 'express';
import { OrderDto } from '../dto/master/order-dto';
import { OrderServiceImpl } from '../services/master/impl/order-service-impl';

let orderService = new OrderServiceImpl(); 

exports.save = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let orderDto = new OrderDto();
    orderDto.filViaRequest(req.body);

    let cr = await orderService.save(orderDto);

    res.send(cr);
  } catch (error) {
    next(error);
  }
};