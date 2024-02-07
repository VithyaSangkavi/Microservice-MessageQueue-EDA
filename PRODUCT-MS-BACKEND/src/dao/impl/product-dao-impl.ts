import { getConnection, Like } from "typeorm";
import { ProductDto } from "../../dto/master/product-dto";
import { Status } from "../../enum/status";
import { ProductEntity } from "../../entity/master/product-entity";
import { ProductDao } from "../product-dao";

/**
 * department data access layer
 * contain crud method
 */
export class ProductDaoImpl implements ProductDao {
  async save(productDto: ProductDto): Promise<ProductEntity> {
    let productRepo = getConnection().getRepository(ProductEntity);
    let productModel = new ProductEntity();

    productModel.status = Status.Online;
    this.prepareProductModel(productModel, productDto);
    let savedDept = await productRepo.save(productModel);
    return savedDept;
  }
  async update(productDto: ProductDto): Promise<ProductEntity> {
    let productRepo = getConnection().getRepository(ProductEntity);
    let productModel = await productRepo.findOne(productDto.getProductId());
    if (productModel) {
      this.prepareProductModel(productModel, productDto);
      let updatedModel = await productRepo.save(productModel);
      return updatedModel;
    } else {
      return null;
    }
  }
  async delete(productDto: ProductDto): Promise<ProductEntity> {
    let productRepo = getConnection().getRepository(ProductEntity);
    let productModel = await productRepo.findOne(productDto.getProductId());
    if (productModel) {
      productModel.status = Status.Offline;
      let updatedModel = await productRepo.save(productModel);
      return updatedModel;
    } else {
      return null;
    }
  }
  
  async findAll(productDto: ProductDto): Promise<ProductEntity[]> {
    let productRepo = getConnection().getRepository(ProductEntity);

    const query = productRepo.createQueryBuilder("product")
      .where("product.status = :product_status", { product_status: Status.Online })

    const products = await query.getMany();

    return products;
  }

  async findById(productId: number): Promise<ProductEntity> {
    let productRepo = getConnection().getRepository(ProductEntity);
    let productModel = await productRepo.findOne(productId);
    return productModel;
  }

  async findByName(name: String): Promise<ProductEntity> {
    let productRepo = getConnection().getRepository(ProductEntity);
    let productModel = await productRepo.findOne({ where: { name: name, status: Status.Online } });
    return productModel;
  }

  async prepareProductModel(productModel: ProductEntity, productDto: ProductDto) {
    productModel.name = productDto.getName();
    productModel.description = productDto.getDescription();
    productModel.price = productDto.getPrice();
    productModel.quantity = productDto.getQuantity();
    productModel.status = Status.Online;
    productModel.createdDate = new Date();
    productModel.updatedDate = new Date();
  }

  prepareSearchObject(productDto: ProductDto): any {
    let searchObject: any = {};
    if (productDto.getName()) {
      searchObject.name = Like("%" + productDto.getName() + "%");
    }

    if (productDto.getDescription()) {
      searchObject.description = Like("%" + productDto.getDescription() + "%");
    }

    if (productDto.getPrice()) {
      searchObject.price = Like("%" + productDto.getPrice() + "%");
    }

    if (productDto.getQuantity()) {
      searchObject.quantity = Like("%" + productDto.getQuantity() + "%");
    }

    searchObject.status = Status.Online;

    if (productDto.getCreatedDate()) {
      searchObject.createdDate = Like("%" + productDto.getCreatedDate() + "%");
    }

    if (productDto.getUpdatedDate()) {
      searchObject.updatedDate = Like("%" + productDto.getUpdatedDate() + "%");
    }

    return searchObject;
  }
}