import BackStack from "./BackStack";

describe('Testing backstack', function () {
    let stack;
    beforeEach(() => {
        stack = new BackStack();
    });
    it('should init properly', function () {
        expect(stack.backStack.getLength()).toBe(1);
        expect(stack.forwardStack.getLength()).toBe(1);

    });
    it('should push item to backstack', function () {
        stack.push({remoteName: "ABC", remotePath: "CAB"});
        expect(stack.backStack.getLength()).toBe(2);
    });
    it('should peek item', function () {
        stack.push({remoteName: "ABC", remotePath: "CAB"});
        expect(stack.backStack.getLength()).toBe(2);

        const item = stack.peek();
        expect(item).toStrictEqual({remoteName: "ABC", remotePath: "CAB"});

    });
    it('should pop item', function () {
        stack.push({remoteName: "ABC", remotePath: "CAB"});

        const item = stack.pop();
        expect(item).toStrictEqual({remoteName: "ABC", remotePath: "CAB"});
    });

    it('should move back', function () {
        stack.push({remoteName: "ABC", remotePath: "CAB"});

        stack.moveBack();
        expect(stack.forwardStack.peek()).toStrictEqual({remoteName: "ABC", remotePath: "CAB"});
    });
    it('should move forward', function () {
        stack.push({remoteName: "ABC", remotePath: "CAB"});

        stack.moveBack();

        stack.moveForward();
        expect(stack.backStack.peek()).toStrictEqual({remoteName: "ABC", remotePath: "CAB"});


    });
});