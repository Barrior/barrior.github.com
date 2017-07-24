import test from 'ava';

test('Promise function', t => {
    return Promise.resolve(3).then(res => {
        t.is(res, 3);
    });
});

function testStatus() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, 2000);
    });
}

test('Async function', async t => {
    const testPass = await testStatus();
    t.true(testPass);
});
