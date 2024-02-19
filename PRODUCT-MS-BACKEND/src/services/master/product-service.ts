import { CommonResponse } from "../../common/dto/common-response";
import { ProductDto } from "../../dto/master/product-dto";

export interface ProductService {
  save(productDto: ProductDto): Promise<CommonResponse>;
  update(productDto: ProductDto): Promise<CommonResponse>;
  delete(productDto: ProductDto): Promise<CommonResponse>;
  find(productDto: ProductDto): Promise<CommonResponse>;
  findById(productId: number): Promise<CommonResponse>;
  increaseProductQuantity(uuid: string, quantityToAdd: number): Promise<CommonResponse>;
  decreaseProductQuantity(uuid: string, quantityToDecrease: number): Promise<CommonResponse>;
}
