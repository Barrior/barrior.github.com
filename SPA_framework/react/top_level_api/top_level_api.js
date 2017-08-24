import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Team extends Component {
    render() {
        return (
            <h3>Team Component</h3>
        )
    }
}

class Proj extends Component {
    render() {
        return (
            <h3>Proj Component</h3>
        )
    }
}

class Message extends Component {
    render() {
        return (
            <div style={{margin: 60}}>
                <Team></Team>
                {
                    React.createElement(Team, null)
                }
                {
                    React.createElement('h3', {style: {color: 'red'}}, 'Test createElement')
                }
                {
                    // 用变量当做 Components 名字加载对应的 组件
                    React.createElement(this.props.component, null)
                }
                {
                    // 用变量当做 Components 名字加载对应的 组件，使用 eval 解析
                    React.createElement(eval(this.props.component), null)
                }
            </div>
        )
    }
}

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>Top Level API Learning</h3>
                <Message component="Team"></Message>
                <Message component="Proj"></Message>
            </div>
        )
    }
}

const instanceOfAppComponent = ReactDOM.render(
    <App />,
    document.getElementById('app')
);

console.log(instanceOfAppComponent);