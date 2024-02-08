import { CommonResponse } from "../../common/dto/common-response";
import { OrderItemsDto } from "../../dto/master/order-items-dto";

export interface OrderItemsService {
  save(orderItemsDto: OrderItemsDto): Promise<CommonResponse>;
}
