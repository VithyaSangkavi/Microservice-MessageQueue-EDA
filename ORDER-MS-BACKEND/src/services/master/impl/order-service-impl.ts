import { CommonResponse } from "../../../common/dto/common-response";
import { OrderDao } from "../../../dao/order-dao";
import { OrderDaoImpl } from "../../../dao/impl/order-dao-impl";
import { OrderDto } from "../../../dto/master/order-dto";
import { CommonResSupport } from "../../../support/common-res-sup";
import { ErrorHandlerSup } from "../../../support/error-handler-sup";
import { OrderService } from "../order-service";
import { OrderItemsDto } from "../../../dto/master/order-items-dto";
import HttpMSServicePath from "../../../support/microservice/http-service-path";
import axios from "axios";
import MicroServiceHttp from "../../../support/microservice/micro-service-http-impl";
import { Mathod } from "../../../enum/method";
import MicroService from "../../../support/microservice/micro-service";
import { EnvironmentConfiguration } from "../../../configuration/environment-configuration";

let httpReq: MicroService = new MicroServiceHttp();

const environmentConfiguration = new EnvironmentConfiguration();
const appConfig = environmentConfiguration.readAppConfiguration();
const amqp = require("amqplib");


/**
 * order service layer
 *
 */
export class OrderServiceImpl implements OrderService {
  orderDao: OrderDao = new OrderDaoImpl();

  /**
   * save new order
   * @param orderDto
   * @returns
   */
  async save(
    orderDto: OrderDto,
    orderItemsDto: OrderItemsDto[]
  ): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      // save new order
      let newOrder = await this.orderDao.save(orderDto, orderItemsDto);

      const quantityToReduce = newOrder.orderItems.map((item) => ({
        productUuid: item.productUuid,
        quantity: item.quantity,
      }));

      console.log(quantityToReduce);

      const path =
        appConfig.getTaskMicroServicePath() + HttpMSServicePath.createOrder;
      // const path = 'http://localhost:4000/service/master/product-decrease'

      const a: CommonResponse = await httpReq.call(
        path,
        Mathod.PUT,
        { quantityToReduce },
        null
      );

      cr.setStatus(true);
      cr.setExtra(newOrder);
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }

  // async save(orderDto: OrderDto, orderItemsDto: OrderItemsDto[]): Promise<CommonResponse> {
  //   let cr = new CommonResponse();
  //   try {
  //     // save new order
  //     let newOrder = await this.orderDao.save(orderDto, orderItemsDto);

  //     const connection = await amqp.connect("amqp://localhost");
  //     const channel = await connection.createChannel();
  //     const queue = "ordersToProduct";

  //     await channel.assertQueue(queue, { durable: false });

  //     channel.sendToQueue(queue, Buffer.from(JSON.stringify(newOrder)));

  //     console.log("Order sent !");

  //     console.log(newOrder);
  //     cr.setStatus(true);
  //   } catch (error) {
  //     cr.setStatus(false);
  //     cr.setExtra(error);
  //     ErrorHandlerSup.handleError(error);
  //   }
  //   return cr;
  // }

  async fetchAllOrders(): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      const allOrders = await this.orderDao.findAllOrders();

      cr.setStatus(true);
      cr.setExtra(allOrders);
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
      throw error;
    }
    return cr;
  }


  async cancel(orderId: number): Promise<CommonResponse> {

    const productUuidsQuantities: Record<string, number> = {};

    let cr = new CommonResponse();
    try {
      let deleteOrder = await this.orderDao.cancel(orderId);

      if (deleteOrder) {
        deleteOrder.orderItems.forEach(orderItem => {
          let productUuid = orderItem.productUuid;
          let quantity = orderItem.quantity;

          productUuidsQuantities[productUuid] = quantity;
        });
      }

      console.log('service -> Product UUIDs and Quantities: ', productUuidsQuantities);

      try {
        for (const productUuid of Object.keys(productUuidsQuantities)) {
          const quantity = productUuidsQuantities[productUuid];

          const payload = {
            quantityToAdd: quantity
          };

          const path = `${HttpMSServicePath.orderCancellation}/${productUuid}`;

          //const path = appConfig.getTaskMicroServicePath() + HttpMSServicePath.orderCancellation + '/' + productUuid;

          const a: CommonResponse = await httpReq.call(path, Mathod.PUT, payload, null);

          // const response = await axios.put(path, payload);
          console.log('Order cancellation microservice response:', a);
        }
      } catch (error) {
        console.error('Error calling order cancellation microservice:', error);
        throw new Error('Failed to cancel order');
      }

      if (deleteOrder) {
        cr.setStatus(true);
      } else {
        cr.setStatus(false);
        cr.setExtra("Not Working !");
      }

    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
      console.error('Error sending message to queue:', error);
      throw new Error('Failed to send message to queue');
    }
    return cr;
  }

  // async updateOrderStatus(orderId: number): Promise<CommonResponse> {
  //   let cr = new CommonResponse();
  //   try {
  //     const updatedOrder = await this.orderDao.updateOrderStatus(orderId);
  //     if (updatedOrder) {
  //       cr.setStatus(true);
  //       console.log("Order status updated to Completed:", updatedOrder);
  //     } else {
  //       cr.setStatus(false);
  //       cr.setExtra("Order not found!");
  //     }
  //   } catch (error) {
  //     cr.setStatus(false);
  //     cr.setExtra(error);
  //     ErrorHandlerSup.handleError(error);
  //     console.error('Error updating order status:', error);
  //     throw new Error('Failed to update order status');
  //   }
  //   return cr;
  // }

  async updateOrderStatus(orderId: number): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      const updatedOrder = await this.orderDao.updateOrderStatus(orderId);

      console.log('updated order : ', updatedOrder);

      if (updatedOrder) {
        for (const orderItem of updatedOrder.orderItems) {
          const productUuid = orderItem.productUuid;
          const quantity = orderItem.quantity;

          const payload = {
            quantityToDecrease: quantity
          };

          const path = `${HttpMSServicePath.confirmOrder}/${productUuid}`;

          const response: CommonResponse = await httpReq.call(path, Mathod.PUT, payload, null);

          // Send message to queue
          const connection = await amqp.connect("amqp://localhost");
          const channel = await connection.createChannel();
          const queue = "orderStatusUpdates";

          await channel.assertQueue(queue, { durable: false });

          channel.sendToQueue(queue, Buffer.from(JSON.stringify(updatedOrder)));

          console.log("Order status update message sent to queue:", updatedOrder);

          console.log('Order confirmation microservice response:', response);
        }

        cr.setStatus(true);
        console.log("Order status updated to Completed:", updatedOrder);
      } else {
        cr.setStatus(false);
        cr.setExtra("Order not found!");
      }
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
    return cr;
  }

  async confirmOrder(orderId: number): Promise<CommonResponse> {

    const productUuidsQuantities: Record<string, number> = {};

    let cr = new CommonResponse();
    try {
      let confirmOrder = await this.orderDao.confirmOrder(orderId);

      if (confirmOrder) {
        confirmOrder.orderItems.forEach(orderItem => {
          let productUuid = orderItem.productUuid;

          let quantity = orderItem.quantity;

          productUuidsQuantities[productUuid] = quantity;
        });
      }

      console.log('service -> Product UUIDs and Quantities: ', productUuidsQuantities);

      try {
        for (const productUuid of Object.keys(productUuidsQuantities)) {
          const quantity = productUuidsQuantities[productUuid];

          const payload = {
            quantityToAdd: quantity
          };

          const path = `${HttpMSServicePath.confirmOrder}/${productUuid}`;

          //const path = appConfig.getTaskMicroServicePath() + HttpMSServicePath.orderCancellation + '/' + productUuid;

          const a: CommonResponse = await httpReq.call(path, Mathod.PUT, payload, null);

          // const response = await axios.put(path, payload);
          console.log('Order confirmation microservice response:', a);
        }
      } catch (error) {
        console.error('Error calling order cancellation microservice:', error);
        throw new Error('Failed to cancel order');
      }

      if (confirmOrder) {
        cr.setStatus(true);
      } else {
        cr.setStatus(false);
        cr.setExtra("Not Working !");
      }

    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
      console.error('Error sending message to queue:', error);
      throw new Error('Failed to send message to queue');
    }
    return cr;
  }
}
