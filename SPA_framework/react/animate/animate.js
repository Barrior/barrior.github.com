import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './animate.less';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ['hello', 'world', 'click', 'me']
        };
    }

    handleRemove(i) {
        this.state.items.splice(i, 1);
        this.setState({
            items: this.state.items
        });
    }

    handleAdd() {
        this.state.items.push(prompt('Enter some text'));
        this.setState({
            items: this.state.items
        });
    }
    
    render() {
        return (
            <div>
                <h3>Title for whom!!</h3>
                <button onClick={this.handleAdd.bind(this)}>Add Item</button>

                <ReactCSSTransitionGroup

                    // 设置 进场/出场 动画的名称，详情得看 css 怎么定义淡入淡出动画的
                    // 进场则给 下面的子元素加 fade-enter, fade-enter-active 类
                    // 出场则给 下面的子元素加 fade-leave, fade-leave-active 类
                    transitionName="fade"

                    // 这两个定义时间好像不是必须，插件会自动根据 transition 时间删除相应calss
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.items.map((item, i) => {
                            return <div key={i} className="red-text">
                                {item}
                                <span
                                    style={{margin: '2px 10px'}}
                                    onClick={this.handleRemove.bind(this, i)}>
                                    X
                                </span>
                            </div>
                        })
                    }
                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup
                    transitionName={{
                      enter: 'enter',
                      enterActive: 'enterActive',
                      leave: 'leave',
                      leaveActive: 'leaveActive',
                      appear: 'appear',
                      appearActive: 'appearActive'
                    }}>
                    <h3>
                        recover~
                    </h3>
                </ReactCSSTransitionGroup>

            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);