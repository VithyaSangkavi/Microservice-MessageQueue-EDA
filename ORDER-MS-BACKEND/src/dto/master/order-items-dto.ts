import { OrderItemsEntity } from "../../entity/master/order-items-entity";
import { PaginationDto } from "../pagination-dto";
import { Status } from "../../enum/status";

export class OrderItemsDto extends PaginationDto {
  private orderItemsId: number;
  private quantity: number;
  private createdDate: Date;
  private updatedDate: Date;
  private status: Status;

  filViaRequest(body) {
    if (body.orderItemsId) {
      this.orderItemsId = body.orderItemsId;
    }
    this.quantity = body.quantity;
    this.createdDate = body.createdDate;
    this.updatedDate = body.updatedDate;
    this.status = body.status;

    if (body.startIndex && body.maxResult) {
      this.setStartIndex(body.startIndex);
      this.setMaxResult(body.maxResult);
    }
  }

  filViaDbObject(orderItemModel: OrderItemsEntity) {
    this.orderItemsId = orderItemModel.id;
    this.quantity = orderItemModel.quantity;
    this.createdDate = orderItemModel.createdDate;
    this.updatedDate = orderItemModel.updatedDate;
    this.status = orderItemModel.status;
  }

  public getOrderItemsId(): number {
    return this.orderItemsId;
  }

  public setOrderId(orderItemsId: number): void {
    this.orderItemsId = orderItemsId;
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

  public getStatus(): Status {
    return this.status;
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

}
