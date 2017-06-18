import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStrore, combineReducers, applyMiddleware, bindActionCreators, compose} from 'redux';
import {connect, Provider} from 'react-redux';
/*
 多层组件之间如何共享状态和共享状态不被轻易修改。

 createStrore: 创建一个 Redux store 来以存放应用中所有的 state
 combineReducers:
 applyMiddleware:
 bindActionCreators:
 compose:

 const store = createStrore(reducer);
 store
     .getState()
     .dispatch(action)
     .subscribe(listener)
     .replaceReducer(nextReducer)

 connect:
 Provider:
 */