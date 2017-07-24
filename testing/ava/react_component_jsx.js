import test from 'ava';
import React from 'react';
import {renderJSX, JSX} from 'jsx-test-helpers';

const Foo = ({children}) => (
    <div className="Foo">
        <span className="bar">bar</span>
        {children}
        <span className="bar">bar</span>
    </div>
);

// renderJSX: test the result string should equal to the expect string
test('renders correct markup', t => {
    const actual = renderJSX(<Foo/>);
    const expected = JSX(
        <div className="Foo">
            <span className="bar">bar</span>
            <span className="bar">bar</span>
        </div>
    );

    console.log(actual, '\n\n', expected);

    t.is(actual, expected);
});