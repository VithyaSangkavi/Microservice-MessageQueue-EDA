import { getConnection, Like } from "typeorm";
import { OrderDto } from "../../dto/master/order-dto";
import { Status } from "../../enum/status";
import { OrderEntity } from "../../entity/master/order-entity";
import { OrderDao } from "../order-dao";
import { OrderItemsDto } from "../../dto/master/order-items-dto";
import { OrderItemsEntity } from "../../entity/master/order-items-entity";
import HttpMSServicePath from "../../support/microservice/http-service-path";
import axios from "axios";
import { OrderStatus } from "../../enum/orderStatus";

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

    await this.prepareOrderModel1(orderModel, orderDto);

    let savedOrder = await orderRepo.save(orderModel);

    let savedOrderItems = [];

    for (let orderItemDto of orderItemsDto) {
      let orderItemsModel = new OrderItemsEntity();

      orderItemsModel.status = Status.Online;
      orderItemsModel.order = savedOrder;
      await this.prepareOrderItemsModel(orderItemsModel, orderItemDto);

      let savedOrderItem = await orderItemsRepo.save(orderItemsModel);
      savedOrderItems.push(savedOrderItem);
    }

    return { order: savedOrder, orderItems: savedOrderItems };
  }

  async prepareOrderModel1(orderModel: OrderEntity, orderDto: OrderDto) {

    orderModel.customerName = orderDto.getCustomerName()
    orderModel.customerPhoneNumber = orderDto.getCustomerPhoneNumber()
    orderModel.address = orderDto.getAddress()
    orderModel.email = orderDto.getEmail();
    orderModel.total = orderDto.getTotal()
    orderModel.status = Status.Online;
    orderModel.orderStatus = OrderStatus.Pending;
    orderModel.createdDate = new Date();
    orderModel.updatedDate = new Date();

  }

  async prepareOrderItemsModel(orderItemsModel: OrderItemsEntity, orderItemsDto: OrderItemsDto) {

    orderItemsModel.quantity = orderItemsDto.getQuantity()
    orderItemsModel.status = Status.Online;
    orderItemsModel.productUuid = orderItemsDto.getProductUuid();
    orderItemsModel.createdDate = new Date();
    orderItemsModel.updatedDate = new Date();
  }




  async findAllOrders(): Promise<any> {
    try {
      const orders = await getConnection()
        .getRepository(OrderEntity)
        .createQueryBuilder("order")
        .leftJoinAndSelect("order.orderItems", "orderItem")
        .orderBy("CASE WHEN order.status = 'online' THEN 0 ELSE 1 END, order.createdDate", "DESC")
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

  async updateOrderStatus(orderId: number): Promise<OrderEntity> {
    let orderRepo = getConnection().getRepository(OrderEntity);
    let order = await orderRepo.findOne(orderId, { relations: ["orderItems"] });

    if (order) {
      order.orderStatus = OrderStatus.Completed;
      await orderRepo.save(order);
      return order;
    } else {
      return null;
    }
  }

  async confirmOrder(orderId: number): Promise<OrderEntity> {
    let orderRepo = getConnection().getRepository(OrderEntity);
    let order = await orderRepo.findOne(orderId);

    if (order) {
      order.orderStatus = OrderStatus.Completed;
      await orderRepo.save(order);
      return order;
    } else {
      return null;
    }
  }

  async prepareOrderModel(orderModel: OrderEntity, orderDto: OrderDto, orderItemsModel: OrderItemsEntity, orderItemsDto: OrderItemsDto) {
    orderModel.customerName = orderDto.getCustomerName()
    orderModel.customerPhoneNumber = orderDto.getCustomerPhoneNumber()
    orderModel.address = orderDto.getAddress()
    orderModel.email = orderDto.getEmail();
    orderModel.total = orderDto.getTotal()
    orderModel.status = Status.Online;
    orderModel.orderStatus = OrderStatus.Pending;
    orderModel.createdDate = new Date();
    orderModel.updatedDate = new Date();
    //order items
    orderItemsModel.quantity = orderItemsDto.getQuantity();
    orderItemsModel.status = Status.Online;
    orderItemsModel.createdDate = new Date();
    orderItemsModel.updatedDate = new Date();
    orderItemsModel.productUuid = orderItemsDto.getProductUuid();
  }

}