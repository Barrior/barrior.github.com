
import React from 'react';
import ReactDOM from 'react-dom';

export default class ShowImg extends React.Component{

    render(){
        return (
            <div>
                <h1>
                    great picture!
                    <b> test </b>
                </h1>
                <img
                    src="https://drscdn.500px.org/photo/168110175/q%3D80_m%3D2000/51d81102076acd5d980451ca41d37a51"
                    alt="The beautiful scenery picture"/>
            </div>
        )
    }

};