import React, { useState, useEffect } from 'react';
import { submitCollection } from '../../_services/submit.service';
import { submitSets } from '../UiComponents/SubmitSets';
import axios from 'axios';
import ImageSoap from '../../assets/img/soap.jpg';
import ImageShampoo from '../../assets/img/shmpoo.jpg';
import ImageBrush from '../../assets/img/brush.jpg';





import './displayProduct.css';
import Navbar from '../navbar/navbar';

import { alertService } from '../../_services/alert.service';

function DisplayProducts() {

  console.log(ImageSoap);

  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemTotals, setItemTotals] = useState({});

  const imageArray = [];
  imageArray.push(ImageSoap)
  imageArray.push(ImageShampoo)
  imageArray.push(ImageBrush)

  for (let i = 0; products.length > i; i++) {

    products[i].image = imageArray[i]
    console.log(products[i].image)

  }


  useEffect(async () => {

    const response = await axios.get('http://localhost:4000/service/master/product-find-all');
    console.log(response.data.extra);
    setProducts(response.data.extra);

  }, []);



  // Function to handle adding a product to the selected products
  const handleAddToCart = (product) => {
    const isAlreadyInCart = selectedProducts.find(item => item.productId === product.productId);

    if (isAlreadyInCart) {
      // If the product is already in the cart, update its quantity
      const updatedProducts = selectedProducts.map(item => {
        if (item.productId === product.productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setSelectedProducts(updatedProducts);
    } else {
      // If the product is not in the cart, add it with quantity 1
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }

    setTotalPrice(totalPrice + product.price);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="product-list">
          <h2 style={{ marginTop: '5%', color: 'white', backgroundColor: '#2c3e50', padding: '10px', borderRadius: '10px', marginBottom: '2%', fontFamily: 'initial' }}>Products Available for Purchase</h2>
          <div className="products">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '200px',
                    height: '210px',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p className="price">MRP - Rs.{product.price}</p>
                  <p className="description">{product.description}</p>
                  <button className="buy-button" onClick={() => handleAddToCart(product)}>Add to Order</button>
                </div>
              </div>
            ))}
          </div>

          <br />

          <div className="order-summary">
            <h2>Order Summary</h2>
            <ul>
              {selectedProducts.map(product => (
                <div key={`Rs.{product.id}-Rs.{product.category}`}>
                  <span className="summary-item">{product.quantity} x {product.name} - </span>
                  <span className="summary-price">Rs.{(product.price * product.quantity).toFixed(2)}</span>
                </div>
              ))}
            </ul>
            <div className="total">
              <span style={{ fontSize: '20px', fontStyle: 'oblique', fontWeight: 'bold' }}>Total Price:</span>
              <span style={{ fontSize: '20px', fontStyle: 'oblique', fontWeight: 'bold' }}>Rs.{totalPrice.toFixed(2)}</span>
            </div>
            <button className="checkout-button" onClick={() => handleBuy(selectedProducts)}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );

  // Function to handle buying a product
  async function handleBuy(selectedProducts) {
    console.log("You bought : ", selectedProducts);

    const order = {
      "customerName": "Thanuja",
      "customerPhoneNumber": 785429634,
      "address": "Kaduwela",
      "total": totalPrice
    };

    const orderItems = selectedProducts.map(product => {
      return {
        "quantity": product.quantity,
        "uuid": product.uuid
      };
    });

    const payload = {
      "order": order,
      "orderItems": orderItems
    };

    console.log("payload : ", payload)

    try {

      const response = await axios.post('http://localhost:4001/service/master/saveOrder', payload);
      console.log(response);
      alertService.success("Order Placed Successfully!")

      setSelectedProducts([]);
      setTotalPrice(0);

    } catch (error) {

      console.log(error);
      alertService.error("Can't Place Order!")

    }

  }
}



export default DisplayProducts;
