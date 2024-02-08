import { CommonResponse } from "../../../common/dto/common-response";
import { OrderItemsDao } from "../../../dao/order-items-dao";
import { OrderItemsDaoImpl } from "../../../dao/impl/order-items-dao-impl";
import { OrderItemsDto } from "../../../dto/master/order-items-dto";
import { CommonResSupport } from "../../../support/common-res-sup";
import { ErrorHandlerSup } from "../../../support/error-handler-sup";
import { OrderItemsService } from "../order-items-service";

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
      console.log(newOrderItems);
      cr.setStatus(true);
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }
}
