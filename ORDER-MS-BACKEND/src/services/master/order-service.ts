import { CommonResponse } from "../../common/dto/common-response";
import { OrderDto } from "../../dto/master/order-dto";

export interface OrderService {
  save(orderDto: OrderDto): Promise<CommonResponse>;
  cancel(orderId: number): Promise<CommonResponse>;
}
