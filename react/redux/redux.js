import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';

const childrenName = ['pure_redux', 'get_start', 'redux_outer', 'redux_inner'];

class App extends Component {

    redirectTo(item) {
        hashHistory.push({
            pathname: item
        });
    }

    render() {
        return (
            <div>
                <h3>ROOT</h3>
                <ul>
                    {
                        childrenName.map((item, index) => {
                            return <li key={index}
                                onClick={this.redirectTo.bind(this, item)}>
                                {item}
                            </li>
                        })
                    }
                </ul>
                {this.props.children}
            </div>
        )
    }
}

const rootRoutes = {
    path: '/',
    component: App,
    getChildRoutes(ns, cb) {
        require.ensure([], (require) => {
            let children = [];
            childrenName.forEach(item => {
                children.push({
                    path: item,
                    getComponent(ns, cb) {
                        //require.ensure([], () => {
                            cb(null, require(`./${item}`));
                        //}, item);
                    }
                });
            });
            cb(null, children);
        });
    }
};

ReactDOM.render(
    <Router history={hashHistory} routes={rootRoutes}/>,
    document.getElementById('app')
);