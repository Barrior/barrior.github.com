import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware, bindActionCreators, compose} from 'redux';
import {connect, Provider} from 'react-redux';

class ThemeSwitch extends Component {
    onHandlerSwitchColor(color) {
        if (this.props.onSwitchColor) {
            this.props.onSwitchColor(color);
        }
    }

    render() {
        const style = {
            color: this.props.themeColor
        };

        return (
            <div>
                <button
                    style={style}
                    onClick={this.onHandlerSwitchColor.bind(this, 'red')}>
                    Red
                </button>
                <button
                    style={style}
                    onClick={this.onHandlerSwitchColor.bind(this, 'blue')}>
                    Blue
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    console.log(state, props);
    return {
        themeColor: state.themeColor
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (color) => {
            dispatch({
                type: 'CHANGE_COLOR',
                themeColor: color
            })
        }
    }
};

export default ThemeSwitch = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch)