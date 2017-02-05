import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import App from '../route/app';
import '../route/route.less';

// https://github.com/ReactTraining/react-router/blob/master/docs/API.md
// https://segmentfault.com/a/1190000007141049
const rootRoutes = {
    path: '/',
    indexRoute: {
        onEnter(nextState, replace, callback) {
            console.info( 'indexRoute onEnter' );
            console.info( 'indexRoute ns: ', nextState );
            console.info( 'indexRoute replace: ', replace );
            console.info( 'indexRoute cb: ', callback );

            // 写了事件处理函数，一定要调用callback，不然不会往下执行
            // 当然，好处就是可方便处理用户操作，然后再渲染视图
            return callback();
            function login(err = ''){
                if (window.prompt(`${err}请输入登录名，提示：1`) == 1) {
                    callback();
                }else{
                    login('登录名输入错误，');
                }
            }
            login();
        },
        getComponent(ns, cb) {
            console.info('indexRoute getComponent ns: ', ns);
            console.info('indexRoute getComponent cb: ', cb);

            // 异步加载index文件，注：异步加载的时候，不要在头部 import 文件
            // 语法：require.ensure(dependencies, callback, chunkName)
            // 如果你是使用 es6 的写法，也就是你的组件都是通过 export default 导出的，
            // 那么在 getComponent 方法里面需要加入 .default
            // 如果添加一个babel插件babel-plugin-add-module-exports，这样就不用处处加.default了
            require.ensure([], () => {
                cb(null, require('../route/index').default);
            }, 'index');
        }
    },
    getComponent(ns, cb){
        console.info('rootRoutes getComponent cb: ', cb);
        cb(null, App);
    },

    // 同步加载子路由
    // 这样的写法 路由配置 还得在组件里面写，不够直观
    // childRoutes 和 getChildRoutes 不能同时存在，只会被应用其中一个
    /*
    childRoutes: [
        require('./user').default
    ],
    childRoutes: [
         {
             path: '/',
             component: require('./App.jsx'),

             getChildRoutes(location, cb) {
                 require.ensure([], (require) => {
                     cb(null, [
                        require('./routes/Foo.jsx'),
                        require('./routes/Bar.jsx')
                     ]);
                 });
             }
         }
    ]
    */

    // 异步加载子路由，并且 路由配置 统一放在当前这个配置文件，比较直观
    getChildRoutes(ns, cb){
        console.info('rootRoutes getChildRoutes ns: ', ns);
        console.info('rootRoutes getChildRoutes cb: ', cb);

        // 这个异步加载，会把下面的所有 没有使用 require.ensure 加载的 component 都打包成一个文件
        require.ensure([], () => {
            cb(null, [
                {
                    path: 'user/(:id)',

                    // 用于同步加载组件
                    component: require('../route/user'),
                    onEnter(nextState, replace, callback) {
                        // do something else...
                        callback();
                    }
                },
                {
                    path: 'about',

                    // getIndexRoute(partialNextState, cb) 仅在当前(父级)路由匹配时才使用该组件
                    // getComponent(nextState, callback) 不管是子路由还是当前(父级)路由都使用该组件
                    // 参数不同，cb 传过来的参数也不同，使用方式不一样
                    getComponent(ns, cb) {
                        require.ensure([], () => {

                            // by getComponent
                            cb(null, require('../route/about'));

                            /*
                            // by getIndexRoute
                            cb(null, {
                                component: require('../route/about').default
                            });
                            */
                        }, 'about');
                    }
                },
                {
                    // 主要看正则，哈哈哈，这样就可以把 book 匹配到此路径啦
                    path: 'book(/:name)',
                    getComponent(ns, cb) {
                        require.ensure([], () => {
                            cb(null, require('./book/booklist'));
                        }, 'booklist');
                    },
                    getChildRoutes(ns, cb) {
                        require.ensure([], () => {
                            cb(null, [
                                {
                                    path: 'javascript',
                                    onEnter(ns, cb) {
                                        cb();
                                    },
                                    getComponent(ns, cb) {
                                        require.ensure([], () => {
                                            cb(null, require('./book/javascript'));
                                        }, 'book-javascript');
                                    }
                                },
                                {
                                    path: 'go',
                                    getComponent(ns, cb) {
                                        require.ensure([], () => {
                                            cb(null, require('./book/go'));
                                        }, 'book-go');
                                    }
                                }
                            ]);
                        }, 'book');
                    }
                }
            ]);
        }, 'children');
    }
};

ReactDOM.render(
    <Router history={hashHistory} routes={rootRoutes}/>,
    document.getElementById('app')
);