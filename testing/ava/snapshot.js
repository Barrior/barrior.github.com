import test from 'ava';

function getUserInfo(uid) {
    return [{
        id: 0,
        name: 'Barrior',
        sex: 'male'
    }, {
        id: 1,
        name: 'Tom',
        sex: 'male'
    }][uid]
}

function renderUserDom(uid) {
    const userInfo = getUserInfo(uid);
    return `
        <div class="user-info">
            <div class="name">${userInfo.name}</div>
            <div class="sex">${userInfo.sex}</div>
            <div>...There are a lot of information</div>
        </div>
    `;
}

test('snapshot', t => {
    const user1 = renderUserDom(0);
    const user2 = renderUserDom(1);

    // id must be a string or a buffer
    t.snapshot(user1, {id: '1'});
    t.snapshot(user2, {id: '2'});
});