import './helpers/setup_dom_env';
import test from 'ava';
import React from 'react';
import {mount} from 'enzyme';

import Todo from './components/todo';

test('actual testing for react component', t => {
    const wrapper = mount(<Todo names={['Barrior', 'Tom']} />);

    const list = wrapper.find('ul');
    t.is(list.find('li').length, 2);

    wrapper.find('textarea').node.value = 'Lily';
    wrapper.find('textarea + button').simulate('click');
    t.is(list.find('li').length, 3);
});