/**
 * Created by weid on 2016/10/27.
 */
import React, {Component} from 'react';
import { Router, Route, Link, hashHistory, browserHistory } from 'react-router';

export default class NotFoundPage extends Component {
    render() {
        return (
            <div>
                <h3 style={{fontSize: 100}}> 404 PAGE </h3>
            </div>
        )
    }
}