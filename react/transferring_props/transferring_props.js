import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor(props) {
        super(props);
        console.info('App props: ', this.props)
    }

    render() {

        // 通过 es7 解构赋值获取除 data 以外的其他数据
        const {data, ...otherData} = this.props;

        return (
            <ul>
                {
                    data.map((item, index) => {
                        return <li key={index}>
                            <div>BookName: {item.name}</div>
                            <div>Inventories: {item.number}</div>
                        </li>
                    })
                }

                {
                    // 传递其他数据
                    // 后面的数据会覆盖前面的数据
                    <Children {...otherData} age="24"></Children>
                }
            </ul>
        )
    }
}

class Children extends Component {

    // props 已接受到父级传递过来的数据
    constructor(props) {
        super(props);
        console.info('Children props: ', this.props);
    }

    render() {
        return (
            <div title={this.props.title}>
                <h3>author: {this.props.author}</h3>
                <h3>age: {this.props.age}</h3>
            </div>
        )
    }
}

const data = [
    {
        name: 'JavaScript高级程序设计',
        number: 230
    },
    {
        name: 'React入门',
        number: 200
    }
];

ReactDOM.render(
    <App data={data} title="title desriptions" author="Barrior" age="23"/>,
    document.getElementById('app')
);