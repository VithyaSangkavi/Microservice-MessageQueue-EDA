import { ProductEntity } from "../../entity/master/product-entity";
import { PaginationDto } from "../pagination-dto";
import { Status } from "../../enum/status";

export class ProductDto extends PaginationDto {
  private productId: number;
  private name: string;
  private description: string;
  private price: number;
  private quantity: number;
  private status: Status;
  private createdDate: Date;
  private updatedDate: Date;
  private uuid : string;
  private image: string;
  filViaRequest(body) {

    if (body.productId) {
      this.productId = body.productId;
    }
    this.name = body.name;
    this.description = body.description;
    this.price = body.price;
    this.quantity = body.quantity;
    this.createdDate = body.createdDate;
    this.updatedDate = body.updatedDate;
    this.uuid = body.uuid
    this.image = body.image

    if (body.startIndex && body.maxResult) {
      this.setStartIndex(body.startIndex);
      this.setMaxResult(body.maxResult);
    }
  }

  filViaDbObject(productModel: ProductEntity) {
    this.productId = productModel.id;
    this.name = productModel.name;
    this.description = productModel.description;
    this.price = productModel.price;
    this.quantity = productModel.quantity;
    this.status = productModel.status;
    this.createdDate = productModel.createdDate;
    this.updatedDate = productModel.updatedDate;
    this.uuid = productModel.uuid;
    this.image = productModel.image;
  }

  public getProductId(): number {
    return this.productId;
  }

  public setProductId(productId: number): void {
    this.productId = productId;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number): void {
    this.price = price;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public getCreatedDate(): Date {
    return this.createdDate;
  }

  public setCreatedDate(createdDate: Date): void {
    this.createdDate = createdDate;
  }

  public getUpdatedDate(): Date {
    return this.updatedDate;
  }

  public setUpdatedDate(updatedDate: Date): void {
    this.updatedDate = updatedDate;
  }

  public getUuid(): string {
    return this.uuid;
  }

  public setUuid(uuid: string): void {
    this.uuid = uuid;
  }

  public getImage(): string {
    return this.image;
  }

  public setImage(image: string): void {
    this.image = image;
  }

  public getStatus(): Status {
    return this.status;
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

}