import React from 'react';
import './navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><a href="/adminoderview">Admin</a></li>
                <li><a href="#">Home</a></li>
                <li><a href="/displayProducts">Products</a></li>
                <li><a href="/displayOrders">Orders</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
