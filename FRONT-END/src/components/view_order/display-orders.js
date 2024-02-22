import React, { useState, useEffect } from 'react';
import { submitCollection } from '../../_services/submit.service';
import { submitSets } from '../UiComponents/SubmitSets';
import axios from 'axios';
import './display-orders.css';
import Navbar from '../navbar/navbar';

import { alertService } from '../../_services/alert.service';

function DisplayOrders() {

  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [isExpanded, setIsExpanded] = useState({});
  const [expandedOrderId, setExpandedOrderId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/service/master/order-find-all');
        console.log('orders -> ', response.data.extra);
        const orders = response.data.extra;
        setOrders(orders);

        const orderIds = orders.map(order => order.id);
        setOrderId(orderIds);

        // Call ViewOrderItems for each order ID
        orderIds.forEach(orderId => {
          ViewOrderItems(orderId);
        });
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, []);


  const filterOrdersByCustomer = (customerName) => {
    setSelectedCustomer(customerName);
  };

  const filteredOrders = selectedCustomer ? orders.filter(order => order.customerName === selectedCustomer) : orders;

  const cancelOrder = async (orderId, orderStatus) => {
    console.log('Cancel Order - Order ID:', orderId);
    console.log('Cancel Order - Order Status:', orderStatus);

    if (orderStatus === 'completed') {
      alert('This order has already been completed. You cannot cancel it.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:4001/service/master/cancelOrder?orderId=${orderId}`);
      setOrders(response.data.extra);
      alert('Order canceled successfully.');
      window.location.reload();
    } catch (error) {
      console.error('Error canceling order:', error);
      alert('Failed to cancel order. Please try again later.');
    }
  };

  const proceedToCheckout = async (orderId, orderStatus) => {
    console.log('Proceed to Checkout - Order ID:', orderId);
    console.log('Proceed to Checkout - Order Status:', orderStatus);

    if (orderStatus === 'completed') {
      alert('This order has already been completed. You cannot proceed to checkout.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:4001/service/master/updateOrderStatus/${orderId}`);
      setOrders(response.data.extra);
      alert('Order confirmed successfully.');
      window.location.reload();
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('Failed to confirm order. Please try again later.');
    }
  };

  const ViewOrderItems = async (orderId) => {
    try {
      if (expandedOrderId === orderId) {
        setExpandedOrderId(null)
        setIsExpanded(prevState => ({
          ...prevState,
          [orderId]: !prevState[orderId]
        }));
      } else {
        setExpandedOrderId(orderId)
        const response = await axios.get(`http://localhost:4001/service/master/viewOrderItem?orderId=${orderId}`);
        if (response) {
          console.log('Order view successfully');
          setOrderItems(response.data.extra)
          console.log(response.data.extra);
          setIsExpanded(prevState => ({
            ...prevState,
            [orderId]: !prevState[orderId]
          }));

        } else {
          console.error('Failed to view order');
        }
      }
    } catch (error) {
      console.error('Error view order:', error);

    }
  };

  return (
    <div>
      <Navbar />
      <div className="order-container">
        <div className="order-list">
          <h2 style={{ marginTop: '5%', color: 'white', backgroundColor: '#2c3e50', padding: '10px', borderRadius: '10px', marginBottom: '2%', fontFamily: 'initial' }}>Orders</h2>
          <div className="orders">
            {Array.isArray(orders) && orders.map(order => (
              <div key={order.orderId} className="order-card">
                <div className="order-details">
                  <h3> Order Id: {order.orderId}</h3>
                  <span className={`status ${order.orderStatus.toLowerCase()}`}>{order.orderStatus}</span>
                  <p className="price">Total Amount- Rs.{order.total}</p>
                  <p className="price">Created Date - {order.createdDate}</p>

                  <button className="view-button" onClick={() => ViewOrderItems(order.orderId)}>View Ordered Items</button> <br/>

                  {isExpanded[order.orderId] && (
                      <div style={{ marginBottom: '3%', marginTop: '3%',  backgroundColor: 'red', padding: '20px', backgroundColor: '#afdbe3', borderRadius: '10px', fontWeight: 'bold' }}>
                        {orderItems.map((orderItem, index) => (
                          <div key={index}>
                            <p style={{ marginBottom: '0.5%' }}>{orderItem.quantity} x {orderItem.name} - Rs. {orderItem.quantity * orderItem.price}</p>
                          </div>
                        ))}
                      </div>
                    )}

                  <button className="cancel-button" onClick={() => cancelOrder(order.orderId, order.orderStatus)}>Cancel Order</button>
                  <button className="checkout-button" onClick={() => proceedToCheckout(order.orderId, order.orderStatus)}>Proceed to Checkout</button>
                </div>
              </div>
            ))}
          </div>

          <br />
        </div>
      </div>
    </div>
  );
}

export default DisplayOrders;