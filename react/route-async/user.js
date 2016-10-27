/**
 * Created by weid on 2016/10/27.
 */
import React, {Component} from 'react';
import { Router, Route, Link, hashHistory, browserHistory } from 'react-router';

class User extends Component {
    render() {
        return (
            <div className="user-page">
                <h3>User</h3>
                <h4>The user id: {this.props.params.id}</h4>
                <div>
                    <h4>this.props is:</h4>
                    {
                        JSON.stringify(this.props)
                    }
                </div>
            </div>
        )
    }
}

export default {
    path: 'user(/:id)',
    getComponent(ns, cb){
        require.ensure([], () => {
            cb(null, User);
        });
    }
}