import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, IndexRoute, Link, hashHistory } from 'react-router';
import './route.less';
import App from './app';
import Index from './index';
import User from './user';
import About from './about';
import NotFoundPage from './not-found-page';

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


            {/* 404 */}
            <Route path='/404' component={NotFoundPage} />

            {/* 其他重定向到 404 */}
            <Redirect from='*' to='/404' />
        </Route>
    </Router>,
    document.getElementById('react-container')
);