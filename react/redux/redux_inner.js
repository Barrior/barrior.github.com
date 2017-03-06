import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';

const store = createStore(()=>{});

export default class Inner extends Component {
    render() {
        const storeState = store.getState();
        console.log(storeState);

        return (
            <div>
                <h3>This's inner page:</h3>
                <div className="content">
                    <h4>Access user info transfer with outer page:</h4>
                    <div>{JSON.stringify(storeState)}</div>
                </div>
            </div>
        )
    }
}















