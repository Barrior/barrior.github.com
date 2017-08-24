import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class List extends Component {

    onCompleteTodo(id) {
        this.props.onCompleteTodo(id);
    }

    onDeleteTodo(id, e) {
        e.stopPropagation();
        this.props.onDeleteTodo(id);
    }

    render() {
        return (
            <ul className="list">
                {
                    this.props.todos.map((todo, i) => {
                        return <li key={i}
                            className={todo.completed ? 'completed' : ''}
                            onClick={this.onCompleteTodo.bind(this, i)}>
                            <span>{todo.text}</span>
                            <button
                                className="btn del"
                                onClick={this.onDeleteTodo.bind(this, i)}>
                                X
                            </button>
                        </li>
                    })
                }
            </ul>
        )
    }
}