import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory } from 'react-router';
import $ from 'jquery';
import Particleground from 'Particleground.js';
import './route.less';

class Index extends Component {
    render() {
        return (
            <div>
                <h3>Index page</h3>
                <div>nav:</div>
                <ul>
                    <li>
                        /* 给当前路由加上 active 状态 */
                        <Link to="/" activeStyle={{color: 'red'}}>Index</Link>
                    </li>
                    <li>
                        /* 给当前路由加上 active 状态, 通过classname */
                        <Link to="/user" activeClassName="active">User</Link>
                    </li>
                    <li>
                        <Link to="/about" activeStyle={{color: 'red'}}>About</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

class User extends Component {
    render() {
        return (
            <div className="user-page">
                <h3>User</h3>
                <h4>The user id: {this.props.params.id}</h4>
                <div>
                    <h4>this.props is:</h4>
                    {JSON.stringify(this.props)}
                </div>
            </div>
        )
    }
}

class About extends Component {
    render() {
        return (
            <h3>About</h3>
        )
    }
}

ReactDOM.render(
    <div>
        <div className="nav">
            <ul>
                <li>
                    <a href="#/">Index</a>
                </li>
                <li>
                    <a href="#/user/45">User</a>
                </li>
                <li>
                    <a href="#/about">About</a>
                </li>
            </ul>
        </div>
        <Router history={ hashHistory }>
            <Route path="/" component={ Index } onEnter={
                console.info('Route tips: Index event is triggered when Enter index page.')
            }/>
            <Route path="/user(/:id)" component={ User }/>
            <Route path="/about" component={ About }/>
        </Router>
    </div>,
    document.getElementById('react-container')
);