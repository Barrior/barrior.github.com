import * as ACTIONS from '../constants/action_types';

// reducer
export default function (state, action) {
    if (!state) {
        state = {
            todos: [
                {
                    text: '待办事项 - 1',
                    completed: false
                },
                {
                    text: '待办事项 - 2',
                    completed: true
                }
            ]
        };
    }
    switch (action.type) {

        case ACTIONS.INIT_TODOS:
            return {todos: action.todos};

        case ACTIONS.ADD_TODO:
            return {
                todos: [...state.todos, {
                    text: action.todo,
                    completed: false
                }]
            };

        case ACTIONS.DELETE_TODO:
            return {
                todos: [
                    ...state.todos.slice(0, action.id),
                    ...state.todos.slice(action.id + 1)
                ]
            };

        case ACTIONS.COMPLETE_TODO:
            let curTodo = Object.assign(state.todos[action.id]);
            curTodo.completed = true;
            return {
                todos: [
                    ...state.todos.slice(0, action.id),
                    curTodo,
                    ...state.todos.slice(action.id + 1)
                ]
            };

        default:
            return state
    }
}

