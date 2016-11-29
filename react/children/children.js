import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            number: ''
        }
    }

    handleUsernameChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    handlePswChange(params, e) {
        console.log(params);
        console.log(e);

        this.setState({
            number: +e.target.value
        });
    }

    submit(e) {
        e.preventDefault();
        if (!this.state.name || !this.state.number) {
            return alert('请输入书名和库存');
        }

        // 调用 父级 函数，触发父级更新
        this.props.onAddBook(this.state);

        // 通过 setState 方法处理后的 state 不是引用关系，而是类似调用 assign 继承后的数据
        this.setState({
            name: '',
            number: ''
        });
    }

    render() {
        return (
            <form className="signin" onSubmit={this.submit.bind(this)}>
                <input
                    type="text"
                    placeholder="书名"
                    value={this.state.name}
                    onChange={this.handleUsernameChange.bind(this)}
                    style={{display: 'block'}}
                />
                <input
                    type="text"
                    placeholder="库存"
                    value={this.state.number}
                    onChange={this.handlePswChange.bind(this, 'The Params')}
                    style={{display: 'block', margin: '10px 0'}}
                />
                <input type="submit" value="Sign in" />
                <div>
                    {
                        JSON.stringify(this.state)
                    }
                </div>
            </form>
        )
    }
}

class Children extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
        console.info('init props: ', this.props);
    }

    addBook(bookInfo) {
        this.state.data.push(bookInfo);
        this.setState({
            data: this.state.data
        });

        // props 不可以直接修改，但引用关系能修改其对象的数据
        console.info('The dynamic props: ', this.props);
    }

    render() {
        return (
            <h3>
                {this.props.children}
                <ul>
                    {
                        this.state.data.map((item, index) => {
                            return <li key={index}>
                                <h3>书名: {item.name}</h3>
                                <h4>库存: {item.number}</h4>
                            </li>
                        })
                    }
                </ul>
                <div>
                    <h3>添加书籍：</h3>
                    <Form onAddBook={this.addBook.bind(this)}></Form>
                </div>
            </h3>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div>
                {this.props.children}

                {
                    <div>{JSON.stringify(this.props.data)}</div>
                }

                <Children data={this.props.data}>
                    Chilren Component
                </Children>
            </div>
        )
    }
}

const data = [
    {
        name: 'JavaScript高级程序设计',
        number: 234
    },
    {
        name: 'React入门',
        number: 200
    }
];

// 异步显示 顶层数据与添加后的数据是否是引用关系
// 结果：是
setTimeout(() => {
    console.info('top data: ', data);
}, 10000);

ReactDOM.render(
    <App data={data}>
        <h1>children 1</h1>
        <h2>children 2</h2>
    </App>,
    document.getElementById('app')
);