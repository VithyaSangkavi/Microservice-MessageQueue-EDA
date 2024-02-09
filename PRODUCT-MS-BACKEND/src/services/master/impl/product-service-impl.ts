import { CommonResponse } from "../../../common/dto/common-response";
import { ProductDao } from "../../../dao/product-dao";
import { ProductDaoImpl } from "../../../dao/impl/product-dao-impl";
import { ProductDto } from "../../../dto/master/product-dto";
import { CommonResSupport } from "../../../support/common-res-sup";
import { ErrorHandlerSup } from "../../../support/error-handler-sup";
import { ProductService } from "../product-service";
const amqp = require('amqplib');


/**
 * department service layer
 *
 */
export class ProductServiceImpl implements ProductService {
  productDao: ProductDao = new ProductDaoImpl();

  /**
   * save new department
   * @param productDto
   * @returns
   */
  async save(productDto: ProductDto): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      // save new product
      let newProduct = await this.productDao.save(productDto);
      cr.setStatus(true);
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }
  /**
   * update product
   * @param productDto
   * @returns
   */
  async update(productDto: ProductDto): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      // validation
      if (productDto.getName()) {
        // check name already have
        let nameProductMode = await this.productDao.findByName(productDto.getName());
        if (nameProductMode && nameProductMode.id != productDto.getProductId()) {
          return CommonResSupport.getValidationException("Product Name Already In Use !");
        }
      } else {
        return CommonResSupport.getValidationException("Product Name Cannot Be null !");
      }

      // update Product
      let updateProduct = await this.productDao.update(productDto);
      if (updateProduct) {
        cr.setStatus(true);
      } else {
        cr.setStatus(false);
        cr.setExtra("Product Not Found !");
      }
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }
  /**
   * delete product
   * not delete from db.just update its status as offline
   * @param productDto
   * @returns
   */
  async delete(productDto: ProductDto): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      // delete Product
      let deleteProduct = await this.productDao.delete(productDto);
      if (deleteProduct) {
        cr.setStatus(true);
      } else {
        cr.setStatus(false);
        cr.setExtra("Product Not Found !");
      }
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }
  /**
   * find all departments
   * @returns
   */
  async find(productDto: ProductDto): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      // find department
      let products = await this.productDao.findAll(productDto);
      let productDtoList = new Array();
      for (const productModel of products) {
        let productDto = new ProductDto();
        productDto.filViaDbObject(productModel);
        productDtoList.push(productDto);
      }
      cr.setStatus(true);
      cr.setExtra(productDtoList);
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }
  /**
   * find product by id
   * @param productId
   * @returns
   */
  async findById(productId: number): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      // find product
      let product = await this.productDao.findById(productId);

      let productDto = new ProductDto();
      productDto.filViaDbObject(product);

      cr.setStatus(true);
      cr.setExtra(productDto);
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }
}
