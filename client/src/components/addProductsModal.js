import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Modal, Button, Row, Table, Col, Input} from 'reactstrap';
import _ from 'lodash';

import { updateShowAddProductsModal, updateProduct } from "../actions";

class AddProductsModal extends Component {
    constructor(){
        super();
        // Selected products are products we save to the db
        this.state = {
            selectedProducts: []
        }
    }

    selectProduct = (checkboxProduct) => {
        let { selectedProducts } = this.state;
        // First check if checkboxProduct is in state
        let checkboxProductIndex = _.findIndex(selectedProducts, product => {
            return product._id === checkboxProduct._id
        });

        if(checkboxProductIndex >= 0) {
            // If it is found, delete it because it was selected earlier
            _.remove(selectedProducts, product => {
                return product._id === checkboxProduct._id
            });
            console.log(selectedProducts);
        } else {
            // If not, it is being selected and the checbox has been ticked
            selectedProducts.push(checkboxProduct);
            console.log(selectedProducts);
        }
        this.setState({selectedProducts: selectedProducts});
    };

    closeModal = async saveChanges => {
        let { selectedProducts } = this.state;
        if(!saveChanges){
            // Product selections should not be saved
            selectedProducts = [];
        }  else {
            // Add selectedProducts to order guide
            selectedProducts.map(product => {
                product.hidden = false;
            });
            let promises = selectedProducts.map(product => {
                return this.props.updateProduct(product);
            });
            await Promise.all(promises);
            selectedProducts = [];
        }
        this.setState({selectedProducts});
        this.props.updateShowAddProductsModal(false);
    };

    render() {
        let productsToShow = this.props.products.filter(product =>
            product.hidden === true
        );
        return (
            <Fragment>
                <Modal isOpen={this.props.showAddProductsModal} className="market-modal" centered>
                    <div className="card-panel card-table">
                        <Row className="modal-header">
                            <Col md={12} className="text-left">
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Col md={12} className="p-0">
                                    <Table className="card-table m-0" responsive>
                                        <tbody>
                                        <tr>
                                            <th>ADD</th>
                                            <th>PRODUCT</th>
                                            <th>UNIT PRICE</th>
                                            <th>BOX SIZE</th>
                                        </tr>
                                        {productsToShow.map((product, index) => (
                                            <tr key={index}>
                                                <td><Input
                                                    type="checkbox"
                                                    onChange={()=>{this.selectProduct(product)}
                                                    }></Input></td>
                                                <td>{product.name}</td>
                                                <td>
                                                    ${product.sellingPrice}\{product.unitQuantity.toUpperCase()}
                                                </td>
                                                <td>
                                                    {product.boxSize}{product.unitQuantity}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Col>
                        </Row>
                        <Row className="modal-footer">
                            <Col md={6}>
                            </Col>
                            <Col md={6} className="btn-container m-0 flex-25">
                                <a href="#"
                                   onClick={() => this.closeModal(false)}>CLOSE</a>
                                <Button type="button"
                                        className="btn-secondary btn"
                                        onClick={() => this.closeModal(true)}
                                >SUBMIT</Button>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    showAddProductsModal: state.products.showAddProductsModal,
    products: state.products.products
});

export default connect(mapStateToProps, { updateShowAddProductsModal, updateProduct})(AddProductsModal);
