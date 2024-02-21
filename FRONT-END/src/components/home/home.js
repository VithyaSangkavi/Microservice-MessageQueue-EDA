import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../navbar/navbar';



import './home.css';

function Home() {
    const history = useHistory();

    const handleProductsClick = () => {
        history.push('/displayproducts');
    };

    const handleAdminClick = () => {
        history.push('/adminoderview');
    };

    return (
        <>
            <Navbar />
            <Container fluid className="homecontainer">
                <div className="homeproduct-list">
                    <Row>
                        <Col>
                            <h2 className="app-title">Shopping App</h2>
                        </Col>
                    </Row>

                    <br />

                    <Row className="button-container">
                        <Col>
                            <button className="button" onClick={handleProductsClick}>Products</button>
                        </Col>
                        <Col>
                            <button className="button" onClick={handleAdminClick}>Admin</button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>


        // <div className="homecontainer">
        //     <div className="homeproduct-list">
        //         <h2 className="app-title">Shopping App</h2>

        //         <div className="button-container">
        //             <button className="button" onClick={handleProductsClick}>Products</button>
        //             <button className="button" onClick={handleAdminClick}>Admin</button>
        //         </div>
        //     </div>
        // </div>
    );
}

export default Home;
