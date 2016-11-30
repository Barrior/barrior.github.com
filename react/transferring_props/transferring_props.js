import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    render() {
        return (
            <div>

            </div>
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

ReactDOM.render(
    <App data={data} title="title intro" other=""/>,
    document.getElementById('app')
);