import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import './todo.less';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.names = ['Barrior', 'Lily'];
    }

    add() {
        const elem = this.refs.textarea;
        const name = elem.value;
        if (name) {
            this.names.push(name);

            elem.value = '';
            this.setState(this);
        }else {
            elem.focus();
        }
    }

    del(i) {
        this.names.splice(i, 1);
        this.setState(this);
    }

    render() {
        return (
            <div className="todo">
                <h3>TODO LIST</h3>
                <div>
                    <textarea cols="30" rows="10" ref="textarea"
                              placeholder="Type the name">
                    </textarea>
                    <button className="btn" onClick={this.add.bind(this)}>
                        Add member
                    </button>
                </div>
                <ul>
                    {
                        this.names.map((name, i) => {

                            // key 用于解决 react diff 算法的问题，重复只会显示一个
                            return <li key={i}>
                                    <span>The name's {name}</span>
                                    <button className="btn" onClick={this.del.bind(this, i)}>
                                        X
                                    </button>
                                </li>
                        })
                    }
                </ul>
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