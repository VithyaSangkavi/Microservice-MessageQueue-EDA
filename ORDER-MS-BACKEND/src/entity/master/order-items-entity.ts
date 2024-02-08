import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { OrderEntity } from "./order-entity";

@Entity({
  name: "orderItem",
})
export class OrderItemEntity {
  @PrimaryGeneratedColumn({name: "orderItemId"})
  id: number;

  @Column()
  quantity: number;

  @Column()
  createdDate: Date;

  @Column()
  updatedDate: Date;
  
}