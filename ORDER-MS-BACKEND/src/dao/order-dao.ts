import { OrderDto } from "../dto/master/order-dto";
import { OrderEntity } from "../entity/master/order-entity";

export interface OrderDao {
  save(orderDto: OrderDto): Promise<OrderEntity>;
}