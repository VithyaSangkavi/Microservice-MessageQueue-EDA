import { ProductDto } from "../dto/master/product-dto";
import { ProductEntity } from "../entity/master/product-entity";

export interface ProductDao {
  save(productDto: ProductDto): Promise<ProductEntity>;
  update(productDto: ProductDto): Promise<ProductEntity>;
  delete(productDto: ProductDto): Promise<ProductEntity>;
  findAll(productDto: ProductDto): Promise<ProductEntity[]>;
  findById(productId: number): Promise<ProductEntity>;
  findByName(name: String): Promise<ProductEntity>;
  increaseQuantity(uuid: string, quantityToAdd: number): Promise<ProductEntity | null>;
  productQuantityDecrease(uuid: string, quantityToDecrease: number): Promise<ProductEntity | null>
}
