import React, {Component} from 'react';
import {render} from 'react-dom';

export default class App extends Component {
    componentDidMount() {
        this.refs.box.onclick = () => {
            console.log('click box: use direct binding');
        };
        this.refs.box.addEventListener('click', () => {
            console.log('click box: use addEventListener');
        });

        /*
        // 非得酱紫才能阻止冒泡，用原生
        this.refs.title.onclick = (e) => {
            e.stopPropagation();
        }
        */
    }

    onClick(e) {
        e.stopPropagation();
    }

    render() {
        return (
            <div>
                <div ref="box">
                    // 使用 onClick 不能阻止冒泡！
                    // 所谓的事件委托机制，也是斗(逗)智斗(逗)勇
                    <h3 ref="title" onClick={this.onClick.bind(this)}>title</h3>
                    <div>content</div>
                </div>
            </div>
        )
    }
}

render(
    <App></App>,
    document.getElementById('app')
);