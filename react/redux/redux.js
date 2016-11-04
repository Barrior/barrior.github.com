import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';

const orginState = {
    username: 'barrior',
    age: 23
};
const reducer = (state, action) => {
    console.log('........reducer........');
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
const logger = (store) => {
    return (next) => {
        return (action) => {
            console.log('dispatching', action);
            let result = next(action);
            console.log('next state', store.getState());
            return result;
        };
    };
};

const store = createStore(reducer, orginState, applyMiddleware(logger));
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
