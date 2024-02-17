import React from 'react';
import './navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><a href="#">Admin</a></li>
                <li><a href="#">Home</a></li>
                <li><a href="#">Products</a></li>
                <li><a href="#">Orders</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
