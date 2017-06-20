import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/todos';
import List from '../components/list';

class ListCtrl extends Component {

    onDeleteTodo(id) {
        this.props.onDeleteTodo(id);
    }

    onCompleteTodo(id) {
        this.props.onCompleteTodo(id);
    }

    render() {
        return (
            <List
                todos={this.props.todos}
                onDeleteTodo={this.onDeleteTodo.bind(this)}
                onCompleteTodo={this.onCompleteTodo.bind(this)}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteTodo(id) {
            return dispatch(actions.deleteTodo(id));
        },
        onCompleteTodo(id) {
            return dispatch(actions.completeTodo(id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCtrl);