// A very simple stack implementation to handle back links in remote explorer
class BackStack {
    constructor() {
        this.items = [{remoteName: "", remotePath: ""}];
        this.count = 1;
    }

    getLength() {
        return this.count;
    }

    push(item) {
        this.items.push(item);
        this.count = this.count + 1;
    }

    pop() {
        if (this.count > 0) {
            this.count = this.count - 1;
        }

        return this.items.pop();
    }

    peek() {
        return this.items.slice(-1)[0];
    }

    empty() {
        this.items = [];
        this.count = 0;
    }

    moveBack() {

        if (this.getLength() > 1)
            this.pop();
    }
}

export default BackStack;