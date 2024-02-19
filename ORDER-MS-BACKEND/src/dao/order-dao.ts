import { OrderDto } from "../dto/master/order-dto";
import { OrderItemsDto } from "../dto/master/order-items-dto";
import { OrderEntity } from "../entity/master/order-entity";
import { OrderItemsEntity } from "../entity/master/order-items-entity";

export interface OrderDao {
  save(orderDto: OrderDto, orderItemsDto: OrderItemsDto[]): Promise<any>;
  cancel(orderId: number): Promise<any>;
  updateOrderStatus(orderId: number): Promise<OrderEntity> ;
}