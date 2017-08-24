import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import actions from '../actions/todos';
import Choice from '../components/choice';

class ChoiceCtrl extends Component {
    render() {
        return (
            <Choice/>
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
        onChangeTodo(id) {
            return dispatch(actions.deleteTodo(id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceCtrl);