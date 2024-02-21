import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/navbar';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { alertService } from '../../_services/alert.service';


function AdminOrderView() {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [isExpanded, setIsExpanded] = useState({});
  const [expandedOrderId, setExpandedOrderId] = useState(null)


  const handleClose = () => setShow(false);
  const handleShow = async (orderId) => {
    setOrderId(orderId);
    setShow(true);
  }



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
        handleClose();
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
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Are sure to cancel oder with oder ID - {orderId}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => cancelOrder(orderId)} style={{ backgroundColor: 'red', border: 'none' }}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <Navbar />
        <div className="container">
          <div className="product-list">
            <h2 style={{ marginTop: '5%', color: 'white', backgroundColor: '#2c3e50', padding: '10px', borderRadius: '10px', marginBottom: '2%', fontFamily: 'initial' }}>Placed Orders</h2>

            <br />

            {orders.map(order => (
              <>
                <div key={order.id} className="order-summary" style={{ position: 'relative' }}>
                  {/* Status indicator */}
                  <div style={{ position: 'absolute', top: 0, right: 0, display: 'flex', alignItems: 'center', marginRight: '20px', marginTop: '15px' }}>
                    {order.status === 'online' ? (
                      <>
                        <div style={{ width: '10px', height: '10px', backgroundColor: 'green', borderRadius: '50%', marginRight: '5px' }}></div>
                        <p style={{ color: 'green', marginBottom: '0' }}>Online</p>
                      </>
                    ) : (
                      <>
                        <div style={{ width: '10px', height: '10px', backgroundColor: 'red', borderRadius: '50%', marginRight: '5px' }}></div>
                        <p style={{ color: 'red', marginBottom: '0' }}>Offline</p>
                      </>
                    )}
                  </div>
                  <div>
                    <p>Order ID - {order.id}</p>
                    <p>Customer Name - {order.customerName}</p>


                    {isExpanded[order.id] && (
                      <div style={{ marginBottom: '3%', backgroundColor: 'red', padding: '20px', backgroundColor: '#afdbe3', borderRadius: '10px', fontWeight: 'bold' }}>
                        {orderItems.map((orderItem, index) => (
                          <div key={index}>
                            <p style={{ marginBottom: '0.5%' }}>{orderItem.quantity} x {orderItem.name} - Rs. {orderItem.quantity * orderItem.price}</p>
                          </div>
                        ))}
                      </div>
                    )}




                    <p style={{ fontSize: '20px', fontStyle: 'oblique', fontWeight: 'bold' }}>Total - {order.total}</p>
                  </div>
                  <button
                    style={{ backgroundColor: '#f76331', marginRight: '1%', fontWeight: 'bold' }}
                    className="checkout-button"
                    onClick={() => handleShow(order.id)}

                  >
                    Cancel Order
                  </button>

                  <button
                    style={{ backgroundColor: '#afdbe3', color: 'black', fontWeight: 'bold', opacity: expandedOrderId === order.id && expandedOrderId != null ? '60%' : '100%' }}
                    className="checkout-button"
                    onClick={() => ViewOrderItems(order.id)}
                    disabled={expandedOrderId != null && expandedOrderId != order.id}

                  >
                    View Order Items
                  </button>

                </div>
                <br />
              </>
            ))}


          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrderView;
