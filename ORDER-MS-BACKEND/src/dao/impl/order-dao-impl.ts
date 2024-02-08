import { getConnection, Like } from "typeorm";
import { OrderDto } from "../../dto/master/order-dto";
import { Status } from "../../enum/status";
import { OrderEntity } from "../../entity/master/order-entity";
import { OrderDao } from "../order-dao";

/**
 * orderitems data access layer
 * contain crud method
 */
export class OrderDaoImpl implements OrderDao {
  async save(orderDto: OrderDto): Promise<OrderEntity> {
    let orderRepo = getConnection().getRepository(OrderEntity);
    let orderModel = new OrderEntity();

    orderModel.status = Status.Online;
    this.prepareProductModel(orderModel, orderDto);
    let savedModel = await orderRepo.save(orderModel);
    return savedModel;
  }


  async cancel(orderId: number): Promise<OrderEntity> {
    let orderRepo = getConnection().getRepository(OrderEntity);
    let orderModel = await orderRepo.findOne(orderId);
    if (orderModel) {
      orderModel.status = Status.Offline;
      let updatedModel = await orderRepo.save(orderModel);
      return updatedModel;
    } else {
      return null;
    }
  }


  async prepareProductModel(orderModel: OrderEntity, orderDto: OrderDto) {
    orderModel.customerName = orderDto.getCustomerName()
    orderModel.customerPhoneNumber = orderDto.getCustomerPhoneNumber()
    orderModel.address = orderDto.getAddress()
    orderModel.total = orderDto.getTotal()
    orderModel.status = Status.Online;
    orderModel.createdDate = new Date();
    orderModel.updatedDate = new Date();
  }

}



