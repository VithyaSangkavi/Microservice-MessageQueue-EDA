import { Column, Entity, PrimaryGeneratedColumn, Table } from "typeorm";

@Entity({
  name: "product",
})
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  quantity: number;
}
