// 先进先出(FIFO)
class Queue {
    constructor() {
        this.storage = [];
    }

    size() {
        return this.storage.length;
    }

    clear() {
        this.storage.length = 0;
    }

    enqueue(fn) {
        this.storage.push(fn);
    }

    dequeue() {
        const first = this.storage.shift();
        first && first();
    }
}

function a() {
    console.log('a');
    q.dequeue();
}
function b() {
    console.log('b');
    q.dequeue();
}
function c() {
    console.log('c');
    q.dequeue();
}
function delay() {
    console.log('delay');
    setTimeout(() => {
        q.dequeue();
    }, 2000)
}

const q = new Queue();

q.enqueue(a);
q.enqueue(b);
q.enqueue(delay);
q.enqueue(c);

q.dequeue();