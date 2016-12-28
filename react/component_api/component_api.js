import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: 'Barrior',
            count: 0
        }
    }

    onIncreaseCount() {
        this.setState((prevSate, curProps) => {
            console.log(prevSate, curProps);
            return {
                count: ++prevSate.count
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
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);