import * as ACTIONS from '../constants/action_types';

// action creators
export const initTodos = (todos) => {
    return {type: ACTIONS.INIT_TODOS, todos}
};

export const addTodo = (todo) => {
    return {type: ACTIONS.ADD_TODO, todo}
};

export const deleteTodo = (id) => {
    return {type: ACTIONS.DELETE_TODO, id}
};

export const completeTodo = (id) => {
    return {type: ACTIONS.COMPLETE_TODO, id}
};