import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/navbar';
import axios from 'axios';

import { alertService } from '../../_services/alert.service';


function AdminOrderView() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4001/service/master/fetchOrder');
      if (response) {

        console.log(response)
        setOrders(response.data.extra);

      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.post(`http://localhost:4001/service/master/cancelOrder?orderId=${orderId}`);
      if (response) {
        fetchOrders();
        console.log('Order cancelled successfully');
        alertService.success("Order Canceled Successfully!")
      } else {
        console.error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="product-list">
          <h2 style={{ marginTop: '5%', color: 'white', backgroundColor: '#2c3e50', padding: '10px', borderRadius: '10px', marginBottom: '2%', fontFamily: 'initial' }}>Placed Orders</h2>

          <br />
          {orders.map(order => (
            <>

              <div key={order.id} className="order-summary">
                <p>Order ID - {order.id}</p>
                <p>Customer Name - {order.customerName}</p>
                <p style={{ fontSize: '20px', fontStyle: 'oblique', fontWeight: 'bold' }}>Total - {order.total}</p>
                <button style={{backgroundColor: '#f76331'}} className="checkout-button" onClick={() => cancelOrder(order.id)}>Cancel Order</button>
              </div><br />

            </>
          ))}

        </div>
      </div>
    </div>
  );
}

export default AdminOrderView;
