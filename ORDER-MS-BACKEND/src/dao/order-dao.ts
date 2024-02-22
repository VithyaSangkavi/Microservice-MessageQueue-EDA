import { OrderDto } from "../dto/master/order-dto";
import { OrderItemsDto } from "../dto/master/order-items-dto";
import { OrderEntity } from "../entity/master/order-entity";
import { OrderItemsEntity } from "../entity/master/order-items-entity";

export interface OrderDao {
  findAllOrders(): Promise<any>;
  save(orderDto: OrderDto, orderItemsDto: OrderItemsDto[]): Promise<any>;
  cancel(orderId: number): Promise<any>;
  updateOrderStatus(orderId: number): Promise<OrderEntity> ;
  confirmOrder(orderId: number): Promise<OrderEntity> ;
  findAll(orderDto: OrderDto, orderItemsDto: OrderItemsDto): Promise<any[]>;
  viewOrderItem(orderId: number): Promise<OrderEntity[]>
}