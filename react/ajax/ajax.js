/**
 * Created by weid on 2016/10/25.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Userinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            githubtUrl: '',
            avatarUrl: ''
        }
    }
    // https://github.com/kdchang/reactjs101/blob/master/Ch04/react-component-life-cycle.md#react-component-生命週期
    // 生命週期: 这个是已插入真實的 DOM 时触发
    componentDidMount() {
        $.get('https://api.github.com/users/Barrior')
            .then(res => {
                console.log(res);
                this.setState({
                    username: res.name,
                    githubtUrl: res.html_url,
                    avatarUrl: res.avatar_url
                })
            })
    }
    render() {
        return (
            <div>
                <h3>username: {this.state.username}</h3>
                <div>
                    <h3>avatar: </h3>
                    <img src={this.state.avatarUrl} width="100px" />
                </div>
                {
                    this.state.githubtUrl && <a href={this.state.githubtUrl}>Github Link</a>
                }
            </div>
        )
    }
}

ReactDOM.render(
    <Userinfo />,
    document.getElementById('app')
);