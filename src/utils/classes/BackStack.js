import Stack from './Stack'

// A very simple stack implementation to handle back links in remote explorer
class BackStack {
    constructor(backStack = undefined) {
        if (backStack) {
            this.backStack = new Stack(backStack.backStack.items, backStack.backStack.count);
            this.forwardStack = new Stack(backStack.forwardStack.items, backStack.forwardStack.count);
            return;
        }
        this.backStack = new Stack();
        this.forwardStack = new Stack();
    }


    getLength() {
        return this.backStack.getLength();
    }

    push(item) {

        this.backStack.push(item);
        this.forwardStack.empty();

    }

    pop() {
        const temp = this.backStack.pop();
        return temp;
    }

    peek() {
        return this.backStack.peek();
    }

    empty() {
        this.backStack.empty();
        this.forwardStack.empty();
    }

    moveBack() {
        const temp = this.backStack.moveBack();
        if(temp)
            this.forwardStack.push(temp);
        return temp;
    }

    moveForward(){
        const temp = this.forwardStack.pop();
        if(temp){
            //Pop was successful
            this.backStack.push(temp);
        }
        return temp;

    }



}

export default BackStack;