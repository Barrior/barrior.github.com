import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Button extends Component {

    // 注册全局变量 context，并请求相应属性
    static contextTypes = {
        color: React.PropTypes.string,
        num: React.PropTypes.number
    };

    constructor(props, context) {
        super(props);
        console.log('context in constructor: ', props, context);
    }

    render() {
        console.log(this.context);
        return (
            <div
                style={{
                    display: 'inline-block',
                    marginLeft: 10,
                    padding: '6px 8px',
                    borderRadius: 4,
                    color: '#fff',
                    cursor: 'pointer',

                    // 使用 context 里的内容，而不是使用一层一层的 数据传递 方式
                    backgroundColor: this.context.color
                }}>
                {this.props.children}
            </div>
        )
    }
}

class Message extends Component {

    // 如果 子组件 也定义了 childContextTypes，则 继承改写 父级传过来的 context 对象，
    // 然后 子子组件 才使用改变后的 context
    static childContextTypes = {
        color: React.PropTypes.string
    };

    getChildContext() {
        return {color: 'red'};
    }

    render() {
        return (
            <div>
                {this.props.text}
                <Button>Delete</Button>
            </div>
        )
    }
}

class App extends Component {

    // 将 color 属性附加到全局 context 上
    static childContextTypes = {
        color: React.PropTypes.string,
        num: React.PropTypes.number
    };

    constructor(props) {
        super(props);
    }

    // 为 children Context 赋值
    // 当 state 或 props 改变时，会调用 getChildContext 方法。为了能更新 context 内的数据
    // 假设由父组件提供的 context 值发生变动，但中间父级组件的 shouldComponentUpdate 返回了 false，
    // 那么后代子级不会更新 context
    getChildContext() {
        console.log('2: getChildContext');
        return {color: 'rgb(27, 171, 255)', num: 10};
    }

    componentWillMount() {
        console.log('1: componentWillMount');
    }

    componentDidMount() {
        console.log('3: componentDidMount');
    }

    // 多么不合理的写法，应该一个函数返回 context 的数据，也不用写 childContextTypes
    // 然后子节点想接受哪个属性，就用 contextTypes 请求哪个属性就好
    // 像现在这样，两边都要定义 context 对象值，还是一样的写法，冗余劳累，
    // 不知道他们怎么想的，所谓的安全么，像 dangerouslySetInnerHTML 也是个鸡肋

    render() {
        return (
            <div>
                <h3>Context Learning</h3>
                <Message text="Hello world"></Message>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);