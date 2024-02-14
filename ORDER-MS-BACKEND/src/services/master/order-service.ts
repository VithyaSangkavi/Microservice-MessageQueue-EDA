import { CommonResponse } from "../../common/dto/common-response";
import { OrderDto } from "../../dto/master/order-dto";
import { OrderItemsDto } from "../../dto/master/order-items-dto";

export interface OrderService {
  save(orderDto: OrderDto, orderItemsDto: OrderItemsDto): Promise<CommonResponse>;
  cancel(orderId: number, productUuidsQuantities: Record<string, number>): Promise<CommonResponse>;
}
