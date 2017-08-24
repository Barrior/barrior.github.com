import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';

const orginState = {
    username: 'barrior',
    age: 23
};

const processor = (state, action) => {
    console.log('........this is reducer, 或许叫做 处理程序 更适合，字如其能........');
    switch (action.type){
        case 'add':
            state.age += action.age;
            break;
        case 'del':
            state.age -= action.age;
            break;
    }
    return state;
};

// 中间件
const logger = (store) => {
    return (next) => {
        return (action) => {
            console.log('dispatching: ', action);
            let result = next(action);
            console.log('next state: ', store.getState());
            return result;
        };
    };
};

const store = createStore(processor, orginState, applyMiddleware(logger));
store.dispatch({
    type: 'add',
    age: 1
});
store.dispatch({
    type: 'add',
    age: 2
});
store.dispatch({
    type: 'del',
    age: 3
});

console.log('store: ', store);
console.log('state: ', store.getState());


export default class PureRedux extends Component {
    render() {
        return (
            <h3>Pure redux learning. Please see the console panel.</h3>
        )
    }
}