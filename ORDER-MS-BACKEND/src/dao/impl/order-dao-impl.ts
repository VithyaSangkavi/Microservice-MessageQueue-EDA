import { getConnection, Like } from "typeorm";
import { OrderDto } from "../../dto/master/order-dto";
import { Status } from "../../enum/status";
import { OrderEntity } from "../../entity/master/order-entity";
import { OrderDao } from "../order-dao";
import { OrderItemsDto } from "../../dto/master/order-items-dto";
import { OrderItemsEntity } from "../../entity/master/order-items-entity";
import HttpMSServicePath from "../../support/microservice/http-service-path";
import axios from "axios";

/**
 * order data access layer
 * contain crud method
 */
export class OrderDaoImpl implements OrderDao {

  async save(orderDto: OrderDto, orderItemsDto: OrderItemsDto[]): Promise<any> {
    let orderRepo = getConnection().getRepository(OrderEntity);
    let orderItemsRepo = getConnection().getRepository(OrderItemsEntity);

    let orderModel = new OrderEntity();
    orderModel.status = Status.Online;
    this.prepareOrderModel(orderModel, orderDto);

    let savedOrder = await orderRepo.save(orderModel);

    let savedOrderItems = [];

    for (let orderItemDto of orderItemsDto) {
      let orderItemsModel = new OrderItemsEntity();
      orderItemsModel.status = Status.Online;
      this.prepareOrderItemsModel(orderItemsModel, orderItemDto);
      orderItemsModel.order = savedOrder;

      let savedOrderItem = await orderItemsRepo.save(orderItemsModel);
      savedOrderItems.push(savedOrderItem);
    }

    return { savedOrder, savedOrderItems };
  }


  async findAllOrders(): Promise<any> {
    try {
      const orders = await getConnection()
      .getRepository(OrderEntity)
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.orderItems", "orderItem")
      .where("order.status = :status", { status: Status.Online }) 
      .orderBy("order.createdDate", "DESC") 
      .getMany();
  
      return orders;
    } catch (error) {
      throw new Error(`Error fetching orders: ${error.message}`);
    }
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

  async prepareOrderModel(orderModel: OrderEntity, orderDto: OrderDto) {

    orderModel.customerName = orderDto.getCustomerName()
    orderModel.customerPhoneNumber = orderDto.getCustomerPhoneNumber()
    orderModel.address = orderDto.getAddress()
    orderModel.total = orderDto.getTotal()
    orderModel.status = Status.Online;
    orderModel.createdDate = new Date();
    orderModel.updatedDate = new Date();

  }

  async prepareOrderItemsModel(orderItemsModel: OrderItemsEntity, orderItemsDto: OrderItemsDto) {

    orderItemsModel.quantity = orderItemsDto.getQuantity()
    orderItemsModel.status = Status.Online;
    orderItemsModel.uuid = orderItemsDto.getUuid();
    orderItemsModel.createdDate = new Date();
    orderItemsModel.updatedDate = new Date();
  }

}



