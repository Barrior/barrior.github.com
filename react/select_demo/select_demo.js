import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from './select/select';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: 'Barrior',
            count: 0,
            items: ['Banana', 'Apple', 'Grape']
        }
    }

    render() {
        const {} = this.state;

        return (
            <div style={{margin: 30}}>
                <Select
                    data={this.state.data}
                />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);