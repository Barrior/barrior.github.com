import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/todos';
import Input from '../components/input';

class InputCtrl extends Component {

    onAddTodo(content) {
        if (this.props.onAddTodo) {
            this.props.onAddTodo(content);
        }
    }


    render() {
        return (
            <Input
                onAddTodo={this.onAddTodo.bind(this)}
            />
        )
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
    return {
        onAddTodo(content) {
            return dispatch(actions.addTodo(content));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InputCtrl);