import { Request, Response, NextFunction } from 'express';
import { ProductDto } from '../dto/master/product-dto';
import { ProductServiceImpl } from '../services/master/impl/product-service-impl';

let ProductService = new ProductServiceImpl(); 

exports.save = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Reached the /product-save endpoint');
    let productDto = new ProductDto();
    productDto.filViaRequest(req.body);

    let cr = await ProductService.save(productDto);

    res.send(cr);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let productDto = new ProductDto();

    const productIdFromQuery = req.query.id;

    if (productIdFromQuery) {
      productDto.setProductId(Number(productIdFromQuery));
    } else {
      console.error('productId not found in the query parameters');
      return res.status(400).json({ error: 'productId not found in the query parameters' });
    }
    console.log('Controller productId:', productDto.getProductId());

    productDto.filViaRequest(req.body);

    let cr = await ProductService.update(productDto);

    res.send(cr);
  } catch (error) {
    next(error);
  }
};

  
  exports.delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let productDto = new ProductDto();
      productDto.filViaRequest(req.body);
  
      let cr = await ProductService.delete(productDto);
  
      res.send(cr);
    } catch (error) {
      next(error);
    }
  };
  
  exports.findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Reached the /product-find-all endpoint');
      let productDto = new ProductDto();
      productDto.filViaRequest(req.body);
  
      let cr = await ProductService.find(productDto);
  
      res.send(cr);
    } catch (error) {
      next(error);
    }
  };
  
  exports.findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let productId = parseInt(req.query.id as string);
  
      let cr = await ProductService.findById(productId);
  
      res.send(cr);
    } catch (error) {
      next(error);
    }
  };