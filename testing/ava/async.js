import test from 'ava';

test('Promise syntax', t => {
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

test('Async syntax', async t => {
    const testPass = await testStatus();
    t.true(testPass);
});
