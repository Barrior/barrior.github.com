import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Choice extends Component {
    render() {
        return (
            <div className="choice">
                <a className="active">All</a>
                <a>Active</a>
                <a>Completed</a>
            </div>
        )
    }
}