import React, {Component} from 'react';
import {connect} from 'react-redux';

import { fetchProducts } from './actions/index';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        return (
            <div>
                Hi There
            </div>
        );
    };
}

export default connect(null, {fetchProducts}) (App);
