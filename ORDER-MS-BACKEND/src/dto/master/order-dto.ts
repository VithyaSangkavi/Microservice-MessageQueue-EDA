import { OrderEntity } from "../../entity/master/order-entity";
import { PaginationDto } from "../pagination-dto";
import { Status } from "../../enum/status";

export class OrderDto extends PaginationDto {
  private orderId: number;
  private customerName: string;
  private customerPhoneNumber: number;
  private address: string;
  private createdDate: Date;
  private updatedDate: Date;
  private total: number;
  private status: Status;

  filViaRequest(body) {
    if (body.orderId) {
      this.orderId = body.orderId;
    }
    this.customerName = body.customerName;
    this.customerPhoneNumber = body.customerPhoneNumber;
    this.address = body.address;
    this.createdDate = body.createdDate;
    this.updatedDate = body.updatedDate;
    this.total = body.total;
    this.status = body.status;

    if (body.startIndex && body.maxResult) {
      this.setStartIndex(body.startIndex);
      this.setMaxResult(body.maxResult);
    }
  }

  filViaDbObject(orderModel: OrderEntity) {
    this.orderId = orderModel.id;
    this.customerName = orderModel.customerName;
    this.customerPhoneNumber = orderModel.customerPhoneNumber;
    this.address = orderModel.address;
    this.createdDate = orderModel.createdDate;
    this.updatedDate = orderModel.updatedDate;
    this.total = orderModel.total;
    this.status = orderModel.status;
  }

  public getOrderId(): number {
    return this.orderId;
  }

  public setOrderId(orderId: number): void {
    this.orderId = orderId;
  }

  public getCustomerName(): string {
    return this.customerName;
  }

  public setCustomerName(customerName: string): void {
    this.customerName = customerName;
  }

  public getCustomerPhoneNumber(): number {
    return this.customerPhoneNumber;
  }

  public setCustomerPhoneNumber(customerPhoneNumber: number): void {
    this.customerPhoneNumber = customerPhoneNumber;
  }

  public getAddress(): string {
    return this.address;
  }

  public setAddress(address: string): void {
    this.address = address;
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

  public getTotal(): number {
    return this.total;
  }

  public setTotal(total: number): void {
    this.total = total;
  }

  public getStatus(): Status {
    return this.status;
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

}
