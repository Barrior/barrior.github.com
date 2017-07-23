import test from 'ava';

const globalData = {};

test.serial('serial testing: step one', t => {
    return new Promise(resolve => {
        setTimeout(() => {
            globalData.name = 'Barrior';
            t.pass();
            resolve();
        }, 500);
    });
});

test('serial testing: step two', t => {
    t.is(globalData.name, 'Barrior');
});