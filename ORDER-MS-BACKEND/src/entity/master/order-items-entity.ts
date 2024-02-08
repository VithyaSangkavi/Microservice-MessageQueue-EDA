import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { Status } from "../../enum/status";

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

  @Column({ type: "enum" ,enum:Status,default:Status.Online})
  status: Status;
}