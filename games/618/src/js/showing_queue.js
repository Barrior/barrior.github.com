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
    
    enqueue(o) {
        this.storage.push(o);
    }
    
    dequeue() {
        return this.storage.shift();
    }
}

export default new Queue();