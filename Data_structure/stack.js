// 后进先出(LIFO)
class Stack {
    constructor() {
        this.storage = [];
    }

    size() {
        return this.storage.length;
    }

    clear() {
        this.storage.length = 0;
    }

    push(fn) {
        this.storage.unshift(fn);
    }

    pop() {
        const first = this.storage.shift();
        first && first();
    }
}

function a() {
    console.log('a');
    s.pop();
}
function b() {
    console.log('b');
    s.pop();
}
function c() {
    console.log('c');
    s.pop();
}
function delay() {
    console.log('delay');
    s.push(() => {
        console.log('force insert');
        s.pop();
    });
    setTimeout(() => {
        s.pop();
    }, 2000)
}

const s = new Stack();

s.push(a);
s.push(b);
s.push(delay);
s.push(c);

s.pop();