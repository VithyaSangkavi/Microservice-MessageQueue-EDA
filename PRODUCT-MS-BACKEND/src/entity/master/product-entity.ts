import { Status } from "../../enum/status";
import { Column, Entity, PrimaryGeneratedColumn, Table, OneToMany } from "typeorm";
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
  price: number;

  @Column()
  quantity: number;

  @Column()
  uuid: string;

  @Column({ type: "enum", enum:Status, default: Status.Online})
  status: Status;

  @Column()
  createdDate: Date;

  @Column()
  updatedDate: Date;

  @Column()
  image: string;
}
