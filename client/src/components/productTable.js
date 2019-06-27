import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Row, Col} from 'reactstrap';

import {fetchProducts} from '../actions/index';
import './productTable.css';

class ProductTable extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    getProductQuantityDisplayValue(product){
        let displayValue;

        if(product.orderQuantity){
            // If product has an orderQuantity display that
            displayValue = product.orderQuantity;
        } else {
            // Else display minOrder
            displayValue = product.minQuantity;
        }

        displayValue += product.unitQuantity.toUpperCase();

        return displayValue;
    }

    render() {
        return (
            <Row className="market-container">
                <Col md={9} className="p-0">
                    <div className="card-panel card-table">
                        <Row className="table-header">
                            <Col md={6}>
                                <h5>Menu Order Guide</h5>
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
                                        {this.props.products.map(product => (
                                            <tr key={product._id}>
                                                <td>{product.name}</td>
                                                <td>
                                                    {product.sellingPrice}\{product.unitQuantity.toUpperCase()}
                                                </td>
                                                <td>
                                                    <i className="eva eva-lg eva-plus-circle-outline btn-mini-minus"></i>
                                                    {this.getProductQuantityDisplayValue(product)}
                                                    <i className="eva eva-lg eva-plus-circle-outline btn-mini-plus"></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products.products
});

export default connect(mapStateToProps, {fetchProducts})(ProductTable);
