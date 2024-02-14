import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { Status } from "../../enum/status";
import { OrderEntity } from "./order-entity";
@Entity({
  name: "orderItems",
})
export class OrderItemsEntity {
  @PrimaryGeneratedColumn({name: "orderItemId"})
  id: number;

  @Column()
  quantity: number;

  @Column()
  createdDate: Date;

  @Column()
  updatedDate: Date;

  @Column()
  uuid: string;

  @Column({ type: "enum" ,enum:Status,default:Status.Online})
  status: Status;

  @ManyToOne(()=> OrderEntity, (order) => order.orderItems)
  @JoinColumn({ name: "orderId" })
  order: OrderEntity;
}