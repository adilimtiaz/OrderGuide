import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, Button } from 'reactstrap';
import moment from 'moment';
import _ from 'lodash';

import { fetchProducts, updateProduct, updateShowModal } from '../actions/index';
import EditOrderGuide from './editOrderGuide';
import { getProductQuantityDisplayValue } from "../utils/productUtills";

class ProductTable extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    updateQuantity = async (product, operationString) => {
        if(product.orderQuantity === 0 && operationString === "minus"){
            return;
        }

        // If product does not have orderQuantity field, create orderQuantity field and update it
        if(!product.orderQuantity){
            // Set product orderQuantity to default order quantity
            product.orderQuantity = product.minQuantity;
        }

        // product orderQuantity guaranteed to exist at this point
        if(operationString === "plus"){
            product.orderQuantity += product.boxSize;
        } else {
            product.orderQuantity -= product.boxSize;
        }
        let newState = await this.props.updateProduct(product);
        this.setState(newState);
    };

    getLeadTimeDisplayValue = leadTime => {
        if(leadTime < 2) {
            return 'Next Day';
        } else {
            return (leadTime.toString() + " Days");
        }
    };

    getOrdersBeforeDisplayValue = () => {
        let orderBeforeDate;
        if (moment().hour() >= 18) {
            orderBeforeDate = moment(new Date()).add(1, 'days');
        } else {
            orderBeforeDate = moment(new Date());
        }
        let orderBeforeDateString = moment(orderBeforeDate).format('dddd MMM Do');
        return ("6:00PM " + orderBeforeDateString);
    };

    getDeliveryByDisplayValue = () => {
        let productsToShow = this.props.products.filter(product =>
            product.hidden === false
        );
        if( productsToShow.length === 0 ){
            // This happens before the products are fetched so return early
            return;
        }
        let maxLeadTimeProduct = _.maxBy(productsToShow, product => {
           return product.leadTime;
        });
        let deliveryDate = moment(new Date()).add(maxLeadTimeProduct.leadTime, 'days');
        return (moment(deliveryDate).format('dddd MMM Do'));
    };

    render() {
        let productsToShow = this.props.products.filter(product =>
            product.hidden === false
        );
        return (
            <Row className="market-container">
                <Col md={9} className="p-0">
                    <div className="card-panel card-table">
                        <Row className="table-header">
                            <Col md={6}>
                                <h5>Menu Order Guide</h5>
                            </Col>
                            <Col md={3} className="text-left p-0 col-md-3">
                                <p>
                                    Order Before
                                    <span className="red-text">
                                        <br></br>
                                        <i className="eva eva-lg eva-car-outline mobile-hidden"></i>
                                        {this.getOrdersBeforeDisplayValue()}
                                    </span>
                                </p>
                            </Col>
                            <Col md={3} className="text-left p-0 col-md-3">
                                <p>
                                    Earliest Delivery
                                    <span className="red-text">
                                        <br></br>
                                        <i className="eva eva-lg eva-car-outline mobile-hidden"></i>
                                        {this.getDeliveryByDisplayValue()}
                                    </span>
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Table responsive>
                                    <tbody>
                                        <tr>
                                            <th>PRODUCT</th>
                                            <th>PRICE</th>
                                            <th>QUANTITY</th>
                                            <th>LEAD TIME</th>
                                        </tr>
                                        {productsToShow.map((product, index) => (
                                            <tr key={index}>
                                                <td>{product.name}</td>
                                                <td>
                                                    ${product.sellingPrice}\{product.unitQuantity.toUpperCase()}
                                                </td>
                                                <td>
                                                    <i
                                                       className="eva eva-lg eva-minus-circle-outline btn-mini-minus"
                                                       onClick={() => this.updateQuantity(product, "minus")}
                                                    ></i>
                                                    {getProductQuantityDisplayValue(product)}
                                                    <i className="eva eva-lg eva-plus-circle-outline btn-mini-plus"
                                                       onClick={() => this.updateQuantity(product, "plus")}
                                                    ></i>
                                                </td>
                                                <td>
                                                    {this.getLeadTimeDisplayValue(product.leadTime)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row className="m-0">
                            <Col md={6}>
                            </Col>
                            <Col md={6} className="btn-container">
                                <a href="#" onClick={() => this.props.updateShowModal(true)}>EDIT GUIDE</a>
                                <Button type="button" className="btn-secondary btn">PLACE ORDER</Button>
                            </Col>
                        </Row>
                        <EditOrderGuide/>
                    </div>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    showModal: state.showModal,
    products: state.products.products
});

export default connect(mapStateToProps, {fetchProducts, updateProduct, updateShowModal})(ProductTable);
