import React, { useState, useEffect } from 'react';
import { submitCollection } from '../../_services/submit.service';
import { submitSets } from '../UiComponents/SubmitSets';
import axios from 'axios';


import './displayProduct.css';

function DisplayProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemTotals, setItemTotals] = useState({});


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
    <div className="container">
      <div className="product-list">
        <h2>Products Available for Purchase</h2>
        <div className="products">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
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
              <li key={`${product.id}-${product.category}`}>
                <span className="summary-item">{product.quantity} x {product.name} - </span>
                <span className="summary-price">${(product.price * product.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="total">
            <span style={{fontSize: '20px', fontStyle: 'oblique', fontWeight: 'bold'}}>Total Price:</span>
            <span style={{fontSize: '20px', fontStyle: 'oblique', fontWeight: 'bold'}}>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="checkout-button">Checkout</button>
        </div>
      </div>
    </div>
  );
}

// Function to handle buying a product
function handleBuy(product) {
  // You can implement the logic to handle the purchase
  console.log(`You bought ${product.name} for $${product.price}`);
}

export default DisplayProducts;

