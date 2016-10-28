/**
 * Created by weid on 2016/10/25.
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './todo.less';

const store = createStore(() => {
    return {
        names: ['Barrior', 'Alice', 'Emily', 'Kate']
    }
});
const state = store.getState();

console.log(state);

class Todo extends Component {
    render() {
        return (
            <div className="todo">
                <h3>TODO</h3>
                <div key="1">
                    {
                        state.names.map((name, i) => {

                            // key 用于解决 react diff 算法的问题，重复只会显示一个
                            return <div key={i}>
                                        The name's
                                        <b> {name} </b>
                                   </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

Todo.propTypes = {

    // 验证当输入的不是字符串时报错
    placeholder: PropTypes.string.isRequired
};

ReactDOM.render(
    <Todo placeholder={'string text'} />,
    document.getElementById('app')
);