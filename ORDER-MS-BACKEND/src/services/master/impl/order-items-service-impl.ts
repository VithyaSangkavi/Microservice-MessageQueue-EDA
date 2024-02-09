import { CommonResponse } from "../../../common/dto/common-response";
import { OrderItemsDao } from "../../../dao/order-items-dao";
import { OrderItemsDaoImpl } from "../../../dao/impl/order-items-dao-impl";
import { OrderItemsDto } from "../../../dto/master/order-items-dto";
import { CommonResSupport } from "../../../support/common-res-sup";
import { ErrorHandlerSup } from "../../../support/error-handler-sup";
import { OrderItemsService } from "../order-items-service";
const amqp = require("amqplib");

/**
 * orderItems service layer
 *
 */
export class OrderItemsServiceImpl implements OrderItemsService {
  orderItemsDao: OrderItemsDao = new OrderItemsDaoImpl();

  /**
   * save new orderItems
   * @param orderItemsDto
   * @returns
   */
  async save(orderItemsDto: OrderItemsDto): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      // save new orderItems
      let newOrderItems = await this.orderItemsDao.save(orderItemsDto);

      const connection = await amqp.connect("amqp://localhost");
      const channel = await connection.createChannel();
      const queue = "ordersToProduct";

      await channel.assertQueue(queue, { durable: false });

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(newOrderItems)));

      console.log("Order sent !");

      cr.setStatus(true);
      cr.setExtra(newOrderItems);
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }
}
