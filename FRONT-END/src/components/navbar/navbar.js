import React from 'react';
import './navbar.css';
import Alerts from '../common_layouts/Alerts';
import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';




function Navbar() {

    const [activeKey, setActiveKey] = useState('/');

    return (
        <>
            <Alerts />

            <Nav variant='pills' className="navbar custom-pill">
                <Nav.Item>
                    <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/adminoderview" className="nav-link" activeClassName="active">Admin</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/displayproducts" className="nav-link" activeClassName="active">Products</NavLink>
                </Nav.Item>
                {/* <Nav.Item>
                    <NavLink to="/orders" className="nav-link" activeClassName="active">Orders</NavLink>
                </Nav.Item> */}
            </Nav>


        </>
    );
}

export default Navbar;
