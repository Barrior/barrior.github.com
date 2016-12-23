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
            <div>
                {
                    // 用变量当做 Components 名字加载对应的 组件
                    React.createElement(this.props.component, 0)
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
                <h3>Context Learning</h3>
                <Message component="Team"></Message>
                <Message component="Proj"></Message>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);