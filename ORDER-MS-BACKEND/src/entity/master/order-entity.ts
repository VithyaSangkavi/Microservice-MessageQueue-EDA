import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { Status } from "../../enum/status";
import { OrderItemEntity } from "./order-items-entity";

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
  createdDate: Date;

  @Column()
  updatedDate: Date;

  @Column()
  total: number;

  @Column({ type: "enum" ,enum:Status,default:Status.Online})
  status: Status;
}