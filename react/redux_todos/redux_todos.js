import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStrore, combineReducers, applyMiddleware} from 'redux';
import {connect, Provider} from 'react-redux';
import './todos.less';

/*
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
 */

class Todo extends Component {
    constructor(props) {
        super(props);
        this.todos = [
            {
                id: Date.now(),
                text: '待办事项 - 1',
                completed: false
            },
            {
                id: Date.now(),
                text: '待办事项 - 2',
                completed: true
            }
        ];

        const spreadOperator = {...this.todos[0]};
        console.log(spreadOperator)
    }

    onAddTodo(keyup, e) {
        console.log(e, e.keyCode)
        if (keyup && e.keyCode === 13 || !keyup) {

        }
    }

    onRemoveTodo() {

    }

    onCompleteTodo() {

    }

    render() {
        return (
            <div className="todos">
                <h3>TODOS</h3>
                <div>
                    <input
                        type="text"
                        ref="input"
                        placeholder="What needs to be done?"
                        onKeyUp={this.onAddTodo.bind(this, true)}
                    />
                    <button className="btn add"
                        onClick={this.onAddTodo.bind(this, false)}>
                        Add
                    </button>
                </div>
                <ul className="list">
                    {
                        this.todos.map((todo, i) => {
                            return <li key={i}
                                className={todo.completed ? 'completed' : ''}
                                onClick={this.onCompleteTodo.bind(this, todo.id)}>
                                <span>{todo.text}</span>
                                <button
                                    className="btn del"
                                    onClick={this.onRemoveTodo.bind(this, todo.id)}>
                                    X
                                </button>
                            </li>
                        })
                    }
                </ul>
                <div className="choice">
                    <a className="active">All</a>
                    <a>Active</a>
                    <a>Completed</a>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Todo />,
    document.getElementById('app')
);