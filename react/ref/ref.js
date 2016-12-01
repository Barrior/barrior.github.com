import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        // 使用 ref
        this.refs.name.value = 'Barrior';
        this._input.value = 'Hello world!';
        this._input.focus();
    }

    render() {
        return (
            <div>
                <from onSubmit={e => e.preventDefault()}>

                    {/* 通过 ref 属性直接取名字获取该元素对象 */}
                    <input type="text" ref="name" />

                    <input
                        type="text"

                        // 当 ref 接受一个函数作为参数时，被引用的组件会被作为参数传递给此函数
                        ref={(inputElem) => {
                            this._input = inputElem
                        }}
                    />
                </from>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);