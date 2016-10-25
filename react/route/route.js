import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory } from 'react-router';
import './route.less';
import App from './app';
import Index from './index';
import User from './user';
import About from './about';

ReactDOM.render(
    <Router history={ hashHistory }>
        {/*
         嵌套路由：
            下面代码中，用户访问 /about 路由时(user等路由同理)，
            会先加载 App 组件，然后在它的内部再加载 About 组件。
            不过要在 App 组件里调用 this.props.children(代表子组件)，子组件才生效
        */}
        <Route path="/" component={App}>
            <IndexRoute component={Index}/>
            <Route path="user(/:id)" component={User} />
            <Route path="about" component={About} />
        </Route>
    </Router>,
    document.getElementById('react-container')
);