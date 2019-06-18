import Stack from "./Stack";

describe('Stack Test', function () {
    let stack;
    beforeEach(() => {
        stack = new Stack();
    });

    it('should initialize with one item', function () {
        expect(stack.getLength()).toBe(1);

    });
    it('should push item', function () {
        stack.push({remoteName: "ABC", remotePath: "BAC"});
        expect(stack.getLength()).toBe(2);
        expect(stack.peek()).toStrictEqual({remoteName: "ABC", remotePath: "BAC"})
    });

    it('should pop item', function () {
        stack.push({remoteName: "ABC", remotePath: "BAC"});
        expect(stack.getLength()).toBe(2);
        const poppedItem = stack.pop();
        expect(stack.getLength()).toBe(1);
        expect(poppedItem).toStrictEqual({remoteName: "ABC", remotePath: "BAC"});
    });

    it('should move back', function () {
        stack.push({remoteName: "ABC", remotePath: "BAC"});
        expect(stack.getLength()).toBe(2);
        const moveBack = stack.moveBack();
        expect(stack.getLength()).toBe(1);
        expect(moveBack).toStrictEqual({remoteName: "ABC", remotePath: "BAC"});

    });
    it('should not move back if only one item is remaining', function () {
        expect(stack.getLength()).toBe(1);
        let item = stack.moveBack();
        expect(item).toBe(undefined);
        expect(stack.getLength()).toBe(1);


        stack.push({remoteName: "ABC", remotePath: "BAC"});
        expect(stack.getLength()).toBe(2);
        item = stack.moveBack();
        expect(item).toStrictEqual({remoteName: "ABC", remotePath: "BAC"});
        item = stack.moveBack();
        expect(item).toBe(undefined);
        expect(stack.getLength()).toBe(1);
    });

    it('should empty stack', function () {
        stack.push({remoteName: "ABC", remotePath: "BAC"});
        expect(stack.getLength()).toBe(2);
        stack.empty();
        expect(stack.getLength()).toBe(0);

    });

    it('should give correct length', function () {
        expect(stack.items.length).toEqual(stack.count);
        expect(stack.items.length).toEqual(stack.getLength());

        stack.push({remoteName: "ABC", remotePath: "BAC"});
        expect(stack.items.length).toEqual(stack.count);
        expect(stack.items.length).toEqual(stack.getLength());

        stack.empty();
        expect(stack.items.length).toEqual(stack.count);
        expect(stack.items.length).toEqual(stack.getLength());

    });


});