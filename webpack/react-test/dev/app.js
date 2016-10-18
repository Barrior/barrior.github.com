// 这里请求node_modules下面的react, react-dom模块
// 在webpack里配置的alias模块不可用，会出现路径错误的情况，这是怎么回事
import React from 'react';
import ReactDOM from 'react-dom';
import Particleground from 'Particleground.js';
import ShowImg from './components/showImg';
import imgUrl from './img/photo.jpg';
import './css/app.less';

class Componet extends React.Component {

    render() {
        return (
            <div>
                <div id="demo" onClick={()=>{this.showEffect()}}>
                    Click me!!!
                </div>
                <div className="btn" onClick={()=>{this.switchEffect()}}>
                    OPEN / PAUSE
                </div>
                <ShowImg imgUrl={imgUrl}></ShowImg>
            </div>
        )
    }

    showEffect() {
        this.effectAnimated = true;
        this.effect = new Particleground.particle('#demo', {
            range: 100,
            dis: 40
        });
    }

    switchEffect() {
        if (this.effect) {
            this.effect[this.effectAnimated ? 'pause' : 'open']();
            this.effectAnimated = !this.effectAnimated;
        }
    }
}


ReactDOM.render(
    <Componet></Componet>,
    document.getElementById('react-container')
);