/**
 * Created by weid on 2016/10/25.
 */
import React, {Component} from 'react';
import { Router, Route, Link, hashHistory, browserHistory } from 'react-router';

class App extends Component {
    render() {
        return (
            <div>
                <h3>App page for render the nav: </h3>
                <ul>
                    <li>
                        <div>/* 给当前路由加上 active 状态，通过样式设置 activeStyle */</div>
                        <Link to="/" activeStyle={{color: 'red'}}
                              onlyActiveOnIndex>Index</Link>
                    </li>
                    <li>
                        <div>/* 给当前路由加上 active 状态，通过 classname */</div>
                        <Link to="/user/1101" activeClassName="active">User</Link>
                    </li>
                    <li>
                        <Link to="/about" activeStyle={{color: 'red'}}>About</Link>
                    </li>
                </ul>
                <div className="children-component">
                    {
                        console.log( this, this.props ),
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}

export default App;