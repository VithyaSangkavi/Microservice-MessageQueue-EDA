// import { Request, Response, NextFunction } from 'express';
// import { OrderItemsDto } from '../dto/master/order-items-dto';
// import { OrderItemsServiceImpl } from '../services/master/impl/order-items-service-impl';

// let orderItemsService = new OrderItemsServiceImpl(); 

// exports.save = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     let orderItemsDto = new OrderItemsDto();
//     orderItemsDto.filViaRequest(req.body);

//     let cr = await orderItemsService.save(orderItemsDto);

//     res.send(cr);
//   } catch (error) {
//     next(error);
//   }
// };