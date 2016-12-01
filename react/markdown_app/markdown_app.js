import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import remarkable from 'remarkable';
import './markdown_app.less';

const md = new remarkable();

class MarkdownEditor extends Component {
    constructor(props) {
        // 默认组件会传一个 props 对象来给 constructor
        // console.log(props)
        super();
        this.state = props;
    }
    handleChange(){
        this.setState({
            content: this.refs.textarea.value
        })
    }
    transferHtml(){
        // http://reactjs.cn/react/tips/dangerously-set-inner-html.html
        return {
            __html: md.render(this.state.content)
        }
    }
    render() {
        return (
            <div className="box cf">
                <h3>Markdown Editor Online</h3>
                <div className="fl">
                    <textarea
                        ref="textarea"
                        onChange={()=>{
                            this.handleChange()
                        }}
                    />
                </div>
                <div className="fr">
                    {/* dangerouslySetInnerHTML 属性用于输出 html 文本 */}
                    <div className="output"
                         dangerouslySetInnerHTML={
                            this.transferHtml()
                         }>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <MarkdownEditor content="# Type some *markdown* here!" />,
    document.getElementById('app')
);