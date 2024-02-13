// import { getConnection, Like } from "typeorm";
// import { OrderItemsDto } from "../../dto/master/order-items-dto";
// import { Status } from "../../enum/status";
// import { OrderItemsEntity } from "../../entity/master/order-items-entity";
// import { OrderItemsDao } from "../order-items-dao";

// /**
//  * orderItems data access layer
//  * contain crud method
//  */
// export class OrderItemsDaoImpl implements OrderItemsDao {
//   async save(orderItemsDto: OrderItemsDto): Promise<OrderItemsEntity> {
//     let orderItemsRepo = getConnection().getRepository(OrderItemsEntity);
//     let orderItemsModel = new OrderItemsEntity();

//     orderItemsModel.status = Status.Online;
//     this.prepareProductModel(orderItemsModel, orderItemsDto);
//     let savedModel = await orderItemsRepo.save(orderItemsModel);
//     return savedModel;
//   }

//   async prepareProductModel(orderItemsModel: OrderItemsEntity, orderItemsDto: OrderItemsDto) {
//     orderItemsModel.quantity = orderItemsDto.getQuantity()
//     orderItemsModel.status = Status.Online;
//     orderItemsModel.createdDate = new Date();
//     orderItemsModel.updatedDate = new Date();
//   }

// }