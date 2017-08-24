import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory, hashHistory} from 'react-router';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';

let state = {
    name: 'Barrior',
    age: 24
};

const ageReducer = (state, action) => {
    switch (action.type) {
        case 'increase':
            state.age++;
            break;
        case 'decrease':
            state.age--;
            break;
    }
    console.log('ageReducer state: ', state);
    return state;
};

const nameReducer = (state, action) => {
    const names = [
        'Alice', 'Jake', 'Barrior',
        'Tina', 'Lili', 'Miya',
        'Tom', 'Stare', 'Jini'
    ];
    switch (action.type) {
        case 'name':
            state.name = names[parseFloat(Math.random() * 10)];
            break;
    }
    console.log('nameReducer state: ', state);
    return state;
};

// 合并多个 reducer
const rootReducers = combineReducers({
    age: ageReducer,
    name: nameReducer
});

const store = createStore(rootReducers, state);

export default class Outer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: store.getState()
        }
    }

    redirectTo() {
        hashHistory.push({
            pathname: '/redux_inner'
        });
    }

    onChangeName() {
        store.dispatch({type: 'name'});
        this.setState({
            userInfo: store.getState()
        });
    }

    onIncreaseAge() {
        store.dispatch({type: 'increase'});
        this.setState({
            userInfo: store.getState()
        });
    }

    onDecreaseAge() {
        store.dispatch({type: 'decrease'});
        this.setState({
            userInfo: store.getState()
        });
    }

    render() {
        return (
            <div>
                <h3>This's outer page:</h3>
                <div className="content">
                    <div>User info:</div>
                    <div>{JSON.stringify(this.state.userInfo)}</div>

                    <div style={{marginTop: 30}}>
                        <input
                            type="button"
                            value="Increase age"
                            onClick={this.onIncreaseAge.bind(this)}
                        />
                        &nbsp;
                        <input
                            type="button"
                            value="Decrease age"
                            onClick={this.onDecreaseAge.bind(this)}
                        />
                        &nbsp;
                        <input
                            type="button"
                            value="Decrease age"
                            onClick={this.onChangeName.bind(this)}
                        />
                    </div>

                    <div style={{marginTop: 30}}>
                        <input
                            type="button"
                            value="Click me to go to inner page"
                            onClick={()=>this.redirectTo()}
                        />
                    </div>
                </div>
            </div>
        )
    }
}













