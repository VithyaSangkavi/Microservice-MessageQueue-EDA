import { CommonResponse } from "../../../common/dto/common-response";
import { ProductDao } from "../../../dao/product-dao";
import { ProductDaoImpl } from "../../../dao/impl/product-dao-impl";
import { ProductDto } from "../../../dto/master/product-dto";
import { CommonResSupport } from "../../../support/common-res-sup";
import { ErrorHandlerSup } from "../../../support/error-handler-sup";
import { ProductService } from "../product-service";
import MicroServiceHttp from "../../../support/microservice/micro-service-http-impl";
import MicroService from "../../../support/microservice/micro-service";
import HttpMSServicePath from "../../../support/microservice/http-service-path";
import { Mathod } from "../../../enum/method";
import { EnvironmentConfiguration } from "../../../configuration/environment-configuration";

let httpReq: MicroService = new MicroServiceHttp();

const environmentConfiguration = new EnvironmentConfiguration();
const appConfig = environmentConfiguration.readAppConfiguration();
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

      let newProduct = await this.productDao.save(productDto);

      const path = appConfig.getTaskMicroServicePath() + HttpMSServicePath.taskCreate

      const a: CommonResponse = await httpReq.call(path, Mathod.GET, { productId: 1 }, null);

      if (a.isStatus()) {

      }

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

  /**
 * Increase the quantity of a product by the specified amount.
 * @param productId The ID of the product to update.
 * @param quantityToAdd The quantity to add to the current quantity.
 * @returns A CommonResponse indicating the success or failure of the operation.
 */
  async increaseProductQuantity(productId: number, quantityToAdd: number): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      // Retrieve the product by its ID
      const productResponse = await this.findById(productId);
      if (!productResponse) {
        cr.setStatus(false);
        cr.setExtra('Product not found');
        return cr;
      }

      // Extract the ProductDto from the response
      const productDto: ProductDto = productResponse.getExtra() as ProductDto;

      // Increment the quantity by the specified amount
      const currentQuantity: number = productDto.getQuantity();
      productDto.setQuantity(currentQuantity + quantityToAdd);

      // Update the product with the new quantity
      const updateResponse = await this.update(productDto);
      if (updateResponse) {
        cr.setStatus(true);
        cr.setExtra('Product quantity updated successfully');
      } else {
        cr.setStatus(false);
        cr.setExtra('Failed to update product quantity');
      }
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error.message);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }

}