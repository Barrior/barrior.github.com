import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware, bindActionCreators, compose} from 'redux';
import {connect, Provider} from 'react-redux';

import ThemeSwitch from './theme_switch';

class Content extends Component {
    render() {
        const style = {
            color: this.props.themeColor
        };

        return (
            <div>
                <p style={style}>
                    I miss you when I'm depressed, just as I miss the sunshine in the winter;<br/>
                    I miss you when I'm irritable, just as I miss the green shade in the blazing sun.<br/>
                    忧愁的时候，我想念你，就如同凛冽冬日里想念暖阳；<br/>
                    烦躁的时候，我想念你，就如同炎炎烈日下想念绿荫。
                </p>
                <ThemeSwitch />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
};

export default Content = connect(mapStateToProps)(Content)