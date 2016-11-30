import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    render() {
        return (
            <div>
                <h3 name="app">APP</h3>
                {
                    this.props.children
                }
            </div>
        )
    }
}

App.Title = React.createClass({
    render() {
        return (
            // 自定义 HTML 原生属性需要用 data- 前缀
            // 否则 React 不会显示它们，现在这个版本好像显示了
            <h4 data-custom-id="55609">
                Title
            </h4>
        )
    }
});

App.Description = React.createClass({
    render() {
        return (
            <h4>
                Description
            </h4>
        )
    }
});


ReactDOM.render(
    <App>
        <App.Title />
        <App.Description />
    </App>,
    document.getElementById('app')
);