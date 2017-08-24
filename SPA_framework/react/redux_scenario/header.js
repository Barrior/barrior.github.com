import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware, bindActionCreators, compose} from 'redux';
import {connect, Provider} from 'react-redux';

class Header extends Component {
    render() {
        const style = {
            color: this.props.themeColor
        };

        return (
            <h3 style={style}>
                It is not easy to meet each other in such a big world.
            </h3>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
};

export default Header = connect(mapStateToProps)(Header)