import { CommonResponse } from "../../../common/dto/common-response";
import { OrderDao } from "../../../dao/order-dao";
import { OrderDaoImpl } from "../../../dao/impl/order-dao-impl";
import { OrderDto } from "../../../dto/master/order-dto";
import { CommonResSupport } from "../../../support/common-res-sup";
import { ErrorHandlerSup } from "../../../support/error-handler-sup";
import { OrderService } from "../order-service";
import { OrderItemsDto } from "../../../dto/master/order-items-dto";

import MicroServiceHttp from "../../../support/microservice/micro-service-http-impl";
import MicroService from "../../../support/microservice/micro-service";
import HttpMSServicePath from "../../../support/microservice/http-service-path";
import { Mathod } from "../../../enum/method";
import { EnvironmentConfiguration } from "../../../configuration/environment-configuration";

let httpReq: MicroService = new MicroServiceHttp();

const environmentConfiguration = new EnvironmentConfiguration();
const appConfig = environmentConfiguration.readAppConfiguration();
const amqp = require('amqplib');

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
  async save(orderDto: OrderDto, orderItemsDto: OrderItemsDto[]): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      // save new order
      let newOrder = await this.orderDao.save(orderDto, orderItemsDto);
      const quantityToReduce = newOrder.savedOrderItems.map(item => ({
        uuid: item.uuid,
        quantity: item.quantity
      }));
      
      console.log(quantityToReduce);

      const path = appConfig.getTaskMicroServicePath() + HttpMSServicePath.createOrder
      // const path = 'http://localhost:4000/service/master/product-decrease'

      const a: CommonResponse = await httpReq.call(path, Mathod.PUT, { quantityToReduce }, null);

    
      cr.setStatus(true);
      cr.setExtra(newOrder)
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }


  async cancel(orderId: number): Promise<CommonResponse> {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queueName = 'order_cancellation_queue';
    let cr = new CommonResponse();
    try {
      let deleteOrder = await this.orderDao.cancel(orderId);
      channel.sendToQueue(queueName, Buffer.from(orderId.toString()));

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
    }finally {
      // Close channel and connection
      await channel.close();
      await connection.close();
    }
    return cr;
  }
}
