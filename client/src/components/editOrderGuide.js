import React, { Component } from 'react';
import { Modal, Button, Row, Table, Col } from 'reactstrap';
import { connect } from 'react-redux';

import { fetchProducts, updateShowModal, updateProduct, updateShowAddProductsModal } from "../actions";
import { getProductQuantityDisplayValue } from "../utils/productUtills";
import AddProductsModal from './addProductsModal';


class EditOrderGuide extends Component {
    updateQuantity = async (product, operationString) => {
        if (product.orderQuantity === 0 && operationString === "minus") {
            return;
        }

        // If product does not have orderQuantity field, create orderQuantity field and update it
        if (!product.orderQuantity) {
            // Set product orderQuantity to default order quantity
            product.orderQuantity = product.minQuantity;
        }

        // product orderQuantity guaranteed to exist at this point
        if (operationString === "plus") {
            product.orderQuantity += product.boxSize;
        } else {
            product.orderQuantity -= product.boxSize;
        }
        let newState = await this.props.updateProduct(product);
        this.setState(newState);
    };

    deleteAllProductsFromOrderGuide = async () => {
        let productsToShow = this.props.products.filter(product =>
            product.hidden === false
        );
        let promises = productsToShow.map(product => {
            return this.deleteProductFromOrderGuide(product);
        });
        await Promise.all(promises);
    };

    deleteProductFromOrderGuide = async (product) => {
        product.hidden = true;
        await this.props.updateProduct(product);
    };

    getProductDeliveryDaysDisplayValue = product => {
        let deliveryDays = product.deliveryDays;
        let displayValue = "";

        for (let day in deliveryDays) {
            if (deliveryDays[day] === true) {
                if (displayValue !== "") {
                    // Add backslash if this is not the first deliveryDay
                    displayValue += "/"
                }
                // Get first 3 letters of day(capital). For example, Friday would give FRI
                displayValue += day.toString().toUpperCase().substr(0, 3);
            }
        }
        return displayValue;
    };


    componentDidMount() {
        // Fetching products so state is always up to date even after adding products
        this.props.fetchProducts();
    }

    render() {
        let productsToShow = this.props.products.filter(product =>
            product.hidden === false
        );
        return (
            <Modal isOpen={this.props.showModal} className="market-modal" centered>
                <AddProductsModal/>
                <div className="card-panel card-table">
                    <Row className="modal-header">
                        <Col md={6} className="text-left">
                        </Col>
                        <Col md={6} className="p-0">
                            <Col md={12} className="modal-header-right">
                                <div className="btn-container m-0">
                                    <a href="#">
                                        <i onClick={() => this.props.updateShowAddProductsModal(true)}
                                           className="eva eva-lg eva-plus-square-outline">
                                            ADD PRODUCT
                                        </i>
                                    </a>
                                    <a href="#" className='alert-text'>
                                        <i className="eva eva-lg eva-trash-2-outline"
                                            onClick={() => this.deleteAllProductsFromOrderGuide()}>
                                            DELETE LIST
                                        </i>
                                    </a>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Table responsive>
                                <tbody>
                                <tr>
                                    <th>PRODUCT</th>
                                    <th>DEFAULT VOLUME</th>
                                    <th>DELIVERY DAYS</th>
                                    <th>DELETE</th>
                                </tr>
                                {productsToShow.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.name}</td>
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
                                            {this.getProductDeliveryDaysDisplayValue(product)}
                                        </td>
                                        <td>
                                            <i className="eva eva-lg eva-trash-2-outline alert-text"
                                               onClick={() => this.deleteProductFromOrderGuide(product)}>
                                            </i>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className="m-0 modal-footer">
                        <Col md={6}>
                        </Col>
                        <Col md={6} className="btn-container m-0 flex-25">
                            <a href="#" onClick={() => this.props.updateShowModal(false)}>CLOSE</a>
                            <Button type="button" className="btn-secondary btn" onClick={() => this.props.updateShowModal(false)}>SUBMIT</Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
        )
    };
}

const mapStateToProps = state => ({
    showModal: state.products.showModal,
    showAddProductsModal: state.products.showAddProductsModal,
    products: state.products.products
});

export default connect(mapStateToProps, {
    fetchProducts,
    updateShowModal,
    updateProduct,
    updateShowAddProductsModal
})(EditOrderGuide);
