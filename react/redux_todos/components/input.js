import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Input extends Component {

    onAddTodo(keyup, e) {
        const value = this.refs.input.value.trim();

        if (value && (keyup && e.keyCode === 13 || !keyup)) {
            this.refs.input.value = '';
            this.refs.input.focus();
            this.props.onAddTodo(value);
        }
    }

    render() {
        return (
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
        )
    }
}