import test from 'ava';
import React from 'react';
import {mount} from 'enzyme';

// import Todo from './components/todo';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: props.names || []
        };
    }

    add() {
        const elem = this.refs.textarea;
        const name = elem.value;
        if (name) {
            elem.value = '';
            this.state.names.push(name);
            this.setState({});
        }else {
            elem.focus();
        }
    }

    del(i) {
        this.state.names.splice(i, 1);
        this.setState({});
    }

    render() {
        return (
            <div className="todo">
                <div>
                    <textarea
                        cols="30"
                        rows="10"
                        ref="textarea"
                        placeholder="Type member name">
                    </textarea>
                    <button
                        className="btn"
                        onClick={this.add.bind(this)}>
                        Add member
                    </button>
                </div>
                <ul>
                    {
                        this.state.names.map((name, i) => {
                            return (
                                <li key={i}>
                                    <span>Member name: {name}</span>
                                    <button
                                        className="btn"
                                        onClick={this.del.bind(this, i)}>
                                        Remove member
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

test('actual testing for react component', t => {
    const wrapper = mount(<Todo names={['Barrior', 'Tom']} />);

    const list = wrapper.find('ul');
    t.is(list.find('li').length, 2);

    wrapper.find('textarea').node.value = 'Lily';
    wrapper.find('textarea + button').simulate('click');
    t.is(list.find('li').length, 3);
});