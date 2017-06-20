import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {connect, Provider} from 'react-redux';
import todosReducers from './reducers/todos';
import Input from './containers/input';
import List from './containers/list';
import Choice from './containers/choice';

import './todos.less';

class Todo extends Component {
    render() {
        return (
            <div className="todos">
                <h3>TODOS</h3>
                <Input/>
                <List/>
                <Choice/>
            </div>
        )
    }
}

ReactDOM.render(
    <Provider store={createStore(todosReducers)}>
        <Todo/>
    </Provider>,
    document.getElementById('app')
);