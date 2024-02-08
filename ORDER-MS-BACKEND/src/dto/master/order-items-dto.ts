import { OrderItemEntity } from "../../entity/master/order-items-entity";
import { PaginationDto } from "../pagination-dto";

export class OrderItemDto extends PaginationDto {
  private orderItemId: number;
  private quantity: number;
  private createdDate: Date;
  private updatedDate: Date;

  filViaRequest(body) {
    if (body.orderItemId) {
      this.orderItemId = body.orderItemId;
    }
    this.quantity = body.quantity;
    this.createdDate = body.createdDate;
    this.updatedDate = body.updatedDate;


    if (body.startIndex && body.maxResult) {
      this.setStartIndex(body.startIndex);
      this.setMaxResult(body.maxResult);
    }
  }

  filViaDbObject(orderItemModel: OrderItemEntity) {
    this.orderItemId = orderItemModel.id;
    this.quantity = orderItemModel.quantity;
    this.createdDate = orderItemModel.createdDate;
    this.updatedDate = orderItemModel.updatedDate;
  }

  public getOrderItemId(): number {
    return this.orderItemId;
  }

  public setOrderItemId(orderItemId: number): void {
    this.orderItemId = orderItemId;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public getcreatedDate(): Date {
    return this.createdDate;
  }

  public setcreatedDate(createdDate: Date): void {
    this.createdDate = createdDate;
  }

  public getUpdatedDate(): Date {
    return this.updatedDate;
  }

  public setUpdatedDate(updatedDate: Date): void {
    this.updatedDate = updatedDate;
  }

}
