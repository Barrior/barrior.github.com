import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Todo extends Component {
    animate(who = '自己') {
        console.log(`我被${who}调用了`);
        console.log(this.props);
    }
    render() {
        return (
            <div onClick={this.props.onClick}>{this.props.title}</div>
        )
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: 'Barrior',
            count: 0,
            items: ['Banana', 'Apple', 'Grape']
        }
    }

    onIncreaseCount() {

        // 函数参数，计算并返回 state 值
        this.setState((prevSate, curProps) => {
            console.log(prevSate, curProps);
            return {
                count: ++prevSate.count
            }
        });
    }

    onClick(index) {

        // 删除 state 值，因为是引用关系，所以，后面只需要调用 setState 即可更新视图
        this.state.items.splice(index, 1);

        this.setState({}, () => {
            if (this.state.items.length === 1) {

                console.log(this.refs.item_0);

                // 公开组件功能(组件之间的通信)：对父组件要调用的子组件简单的公开方法
                // 通过 refs 调用子组件的 animate 方法
                this.refs.item_0.animate('父组件');
            }
        });
    }

    render() {
        return (
            <div>
                <h3>count: {this.state.count}</h3>
                <h4>Author: {this.state.author}</h4>

                <button onClick={this.onIncreaseCount.bind(this)}>
                    Increase Count
                </button>

                {this.state.items.map((item, i) => {
                    return <Todo
                        key={i}
                        ref={'item_' + i}
                        onClick={this.onClick.bind(this, i)}
                        title={item}
                    />
                })}
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);