import { OrderItemsDto } from "../dto/master/order-items-dto";
import { OrderItemsEntity } from "../entity/master/order-items-entity";

export interface OrderItemsDao {
  save(orderItemsDto: OrderItemsDto): Promise<OrderItemsEntity>;
}