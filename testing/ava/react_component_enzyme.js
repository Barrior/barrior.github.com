import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

const Foo = ({children}) => (
    <div className="Foo">
        <span className="bar">bar</span>
        {children}
        <span className="bar">bar</span>
    </div>
);

// shallow: attribute value testing
test('has a .Foo class name', t => {
    const wrapper = shallow(<Foo/>);
    t.true(wrapper.hasClass('Foo'));
});

test('renders children when passed in', t => {
    const wrapper = shallow(
        <Foo>
            <div className="unique"/>
        </Foo>
    );

    console.log(wrapper);

    t.true(wrapper.contains(<div className="unique"/>));
});