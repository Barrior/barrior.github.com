import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';

// 处理函数_计数器， 即 reducer
// 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
function counter(state = 0, action) {
    switch (action.type) {
        // 增量
        case 'increment':
            return state + 1;
        // 缩减
        case 'decrement':
            return state - 1;
        default:
            return state;
    }
}


// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(counter);


// 可以手动订阅更新，也可以事件绑定到视图层。
// 当调用 dispatch 后，counter 就会执行，执行完毕 subscribe 就跟在后面执行
store.subscribe(() => {
    console.log(store.getState());
});


// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({type: 'increment'});
store.dispatch({type: 'increment'});
store.dispatch({type: 'decrement'});


export default class GetStart extends Component {
    render() {
        return (
            <h3>Redux get start. Please see the console panel.</h3>
        )
    }
}












