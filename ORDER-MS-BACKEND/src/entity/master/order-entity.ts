import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { Status } from "../../enum/status";
import { OrderItemsEntity } from "./order-items-entity";
import { OrderStatus } from "../../enum/orderStatus";

@Entity({
  name: "order",
})
export class OrderEntity {
  @PrimaryGeneratedColumn({name: "orderId"})
  id: number;

  @Column()
  customerName: string;

  @Column()
  customerPhoneNumber: number;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  createdDate: Date;

  @Column()
  updatedDate: Date;

  @Column()
  total: number;

  @Column({ type: "enum" ,enum:Status,default:Status.Online})
  status: Status;

  @Column({ type: "enum", enum:OrderStatus, default: OrderStatus.Pending})
  orderStatus: OrderStatus

  @OneToMany(() => OrderItemsEntity, (orderItems) => orderItems.order)
  orderItems: OrderItemsEntity[];
}