import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';

let store = createStore(()=>{});

console.log(store.getState());















