import test from 'ava';
import {JSDOM} from 'jsdom';

const html = `
<!DOCTYPE html>
<html>
<head></head>
<body>
    <div class="comment-box">
        <textarea></textarea>
        <div class="btn">发布</div>
        <ul class="list"></ul>
    </div>
    <script>
        const textarea = document.querySelector('.comment-box textarea');
        const btn = document.querySelector('.btn');
        const list = document.querySelector('.list');

        btn.addEventListener('click', () => {
            const content = textarea.value;
            if (content) {
                const li = document.createElement('li');
                li.innerHTML = content;
                list.insertBefore(li, list.children[0]);
                textarea.value = '';
            }
        });
    </script>
</body>
</html>
`;

const {window} = new JSDOM(html, {runScripts: 'dangerously'});
const document = window.document;

test('emulate DOM environment with JSDOM', t => {
    const textarea = document.querySelector('.comment-box textarea');
    const btn = document.querySelector('.btn');
    const list = document.querySelector('.list');
    const text = 'hello world';

    btn.click();
    t.is(list.children.length, 0);

    textarea.value = text;
    btn.click();
    t.is(list.children.length, 1);
    t.is(list.children[0].innerHTML, text);
    t.falsy(textarea.value);
});