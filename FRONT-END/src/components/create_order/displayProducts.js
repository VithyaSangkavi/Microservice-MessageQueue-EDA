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

    fetchData()

    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);

  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/service/master/product-find-all');
      console.log(response.data.extra);
      setProducts(response.data.extra);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleAddToCart = (product) => {

    let productId = product.productId

    let productNeed = products.find(product => product.productId === productId);

    console.log(productNeed)
    console.log(product.quantitySelected)

    if (productNeed.quantity < product.quantitySelected){
      alertService.error("Selected quantity exceeds available quantity.")
      return
    }


    if (product.quantitySelected > 0) {
      const existingProductIndex = selectedProducts.findIndex(
        (item) => item.productId === product.productId
      );
      


      if (existingProductIndex !== -1) {
        // Product already exists in the cart, update the quantity
        const updatedProducts = [...selectedProducts];
        updatedProducts[existingProductIndex].quantity += product.quantitySelected;
        setSelectedProducts(updatedProducts);
      } else {
        // Product does not exist in the cart, add it
        setSelectedProducts([
          ...selectedProducts,
          { ...product, quantity: product.quantitySelected },
        ]);
      }

      setTotalPrice(totalPrice + product.price * product.quantitySelected);
    } else {
      alertService.error("Please select a quantity.");
    }
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
                  <div>
                    <input
                      type="number"
                      min="1"
                      defaultValue="0"
                      onChange={(e) => product.quantitySelected = parseInt(e.target.value)}
                      className="input-field"
                    />

                    <button className="buy-button" onClick={() => handleAddToCart(product)}>Add to Order</button>

                    <p style={{ marginTop: '10px', color: product.quantity < 10 ? 'red' : 'green', fontSize: '12px', fontStyle: 'italic' }}>
                      Available Quantity: {product.quantity}
                    </p>

                  </div>
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
      "total": totalPrice,
      "email": "example@gmail.com"
    };

    const orderItems = selectedProducts.map(product => {
      return {
        "quantity": product.quantity,
        "productUuid": product.uuid
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
      fetchData()

      document.querySelectorAll('.input-field').forEach(input => {
        input.value = '0';
      });


      setSelectedProducts([]);
      setTotalPrice(0);

    } catch (error) {

      console.log(error);
      alertService.error("Can't Place Order!")

    }

  }
}



export default DisplayProducts;

