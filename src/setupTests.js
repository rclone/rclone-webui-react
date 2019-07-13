import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

const originalConsoleError = console.error;

console.error = message => {
    if (/(Failed prop type)/.test(message)) {
        throw new Error(message);
    }

    originalConsoleError(message);
};

// const originalConsoleLog = console.log;

console.log = message => {

    throw new Error(`Not allowed to print to console from components. Remove any console.log() statements. console.error still works.->${message}`);

    // originalConsoleLog(message);
};

if (global.document) {
    document.queryCommandSupported = jest.fn().mockImplementation((e) => true);
    document.createRange = () => ({
        setStart: () => {
        },
        setEnd: () => {
        },
        commonAncestorContainer: {
            nodeName: 'BODY',
            ownerDocument: document,
        },
    });
}

