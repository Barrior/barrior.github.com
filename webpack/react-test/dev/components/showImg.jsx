import React from 'react';
import ReactDOM from 'react-dom';

export default class ShowImg extends React.Component {

    render() {
        return (
            <div>
                <h1> Great picture! </h1>
                <img
                    src={this.props.imgUrl}
                    alt="Great picture!"/>
            </div>
        )
    }

};