import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {

    // 定义默认配置，没有传参就使用这个默认配置
    static defaultProps = {
        data: {
            author: 'Barrior',
            date: Date.now()
        }
    };

    // 如果给 data 指令传入数据，则必须符合定义的数据类型，这里是 object 类型
    // 也可以省略不传，这样也校验通过，相当于传入 undefined
    // 类型表：http://reactjs.cn/react/docs/reusable-components-zh-CN.html#prop-验证
    static propTypes = {
        data: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        console.log(props);
        console.log(this);
    }

    render() {
        return (
            <div>
                <div>Author: { this.props.data.author }</div>
                <div>Date: { this.props.data.date }</div>
            </div>
        )
    }
}

const data = {
    author: 'jake',
    date: '2016.11.30'
};

ReactDOM.render(
    <div>
        <h3>通过传值显示的数据</h3>
        <App data={data} />

        <br/>

        <h3>获取默认值显示的数据</h3>
        <App data={undefined} />
    </div>,
    document.getElementById('app')
);
