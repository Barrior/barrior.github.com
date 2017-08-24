import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware, bindActionCreators, compose} from 'redux';
import {connect, Provider} from 'react-redux';
/*
 应用场景：多层的嵌套很深的组件之间如何共享状态和共享状态不被轻易修改。

 createStrore:          创建一个 Redux store 来以存放应用中所有的 state
 combineReducers:       合并多个 reducer
 applyMiddleware:       应用中间件
 bindActionCreators:    把 action creators 转成拥有同名 keys 的对象
 compose:               从右到左来组合多个函数

 const store = createStrore(reducer);
 store
     .getState()                        获取数据
     .dispatch(action)                  更新数据
     .subscribe(listener)               监听数据改变，执行某些操作
     .replaceReducer(nextReducer)       替换当前用来计算 state 的 reducer

 connect: 指定准确的 state 到你想要获取的组件中。这让你能获取到任何级别颗粒度的数据
 Provider:
     使组件层级中的 connect() 方法都能够获得 Redux store。
     正常情况下，你的根组件应该嵌套在 <Provider> 中才能使用 connect() 方法
 */
/*
  以下演示【子子子组件】切换主题色，更新整个应用的主题色——的便捷方式

  App
    Header
    Content
        themeSwitch
*/

import Header from './header';
import Content from './content';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}

const themeReducer = (state, action) => {
    if (!state) {
        return {
            themeColor: 'red',
            otherProps: {
                name: 'Barrior',
                age: 24
            }
        }
    }
    switch (action.type) {
        case 'CHANGE_COLOR':
            return {...state, themeColor: action.themeColor};
        default:
            return state;
    }
};

ReactDOM.render(
    <Provider store={createStore(themeReducer)}>
        <App />
    </Provider>,
    document.getElementById('app')
);