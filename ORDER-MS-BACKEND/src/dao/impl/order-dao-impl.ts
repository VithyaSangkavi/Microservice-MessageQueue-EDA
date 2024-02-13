import { getConnection, Like } from "typeorm";
import { OrderDto } from "../../dto/master/order-dto";
import { Status } from "../../enum/status";
import { OrderEntity } from "../../entity/master/order-entity";
import { OrderDao } from "../order-dao";
import { OrderItemsDto } from "../../dto/master/order-items-dto";
import { OrderItemsEntity } from "../../entity/master/order-items-entity";

/**
 * order data access layer
 * contain crud method
 */
export class OrderDaoImpl implements OrderDao {
  async save(orderDto: OrderDto, orderItemsDto: OrderItemsDto): Promise<any> {
    let orderRepo = getConnection().getRepository(OrderEntity);
    let orderItemsRepo = getConnection().getRepository(OrderItemsEntity);

    let orderModel = new OrderEntity();
    let orderItemsModel = new OrderItemsEntity();

    orderModel.status = Status.Online;
    orderItemsModel.status = Status.Online;

    this.prepareOrderModel(orderModel, orderDto, orderItemsModel, orderItemsDto);

    let savedOrder = await orderRepo.save(orderModel);

    orderItemsModel.order = savedOrder;

    let savedOrderItems = await orderItemsRepo.save(orderItemsModel);

    return { order: savedOrder, orderItems: savedOrderItems };
  }


  async cancel(orderId: number): Promise<any> {
    let orderRepo = getConnection().getRepository(OrderEntity);
    let orderItemsRepo = getConnection().getRepository(OrderItemsEntity);

    let order = await orderRepo.findOne(orderId, { relations: ["orderItems"] });

    if (order) {
      order.status = Status.Offline;

      order.orderItems.forEach(orderItem => {
        orderItem.status = Status.Offline;
      });

      await orderRepo.save(order);
      await orderItemsRepo.save(order.orderItems);

      return order;
    } else {
      return null;
    }
  }

  async prepareOrderModel(orderModel: OrderEntity, orderDto: OrderDto, orderItemsModel: OrderItemsEntity, orderItemsDto: OrderItemsDto) {
    orderModel.customerName = orderDto.getCustomerName()
    orderModel.customerPhoneNumber = orderDto.getCustomerPhoneNumber()
    orderModel.address = orderDto.getAddress()
    orderModel.total = orderDto.getTotal()
    orderModel.status = Status.Online;
    orderModel.createdDate = new Date();
    orderModel.updatedDate = new Date();
    //order items
    orderItemsModel.quantity = orderItemsDto.getQuantity()
    orderItemsModel.status = Status.Online;
    orderItemsModel.createdDate = new Date();
    orderItemsModel.updatedDate = new Date();
  }

}



