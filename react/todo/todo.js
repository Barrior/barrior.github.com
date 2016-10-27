/**
 * Created by weid on 2016/10/25.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './todo.less';

const store = createStore(() => {
    return {
        name: 'barrior'
    }
});
const state = store.getState();

console.log(state)

class Todo extends Component {
    render() {
        return (
            <div className="todo">
                TODO
            </div>
        )
    }
}

ReactDOM.render(
    <Todo />,
    document.getElementById('app')
);