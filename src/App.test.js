import React from 'react';
import {shallow} from 'enzyme/build';
import App from './App';
import {findByTestAtrr, testStore} from "../Utils";
import {Provider} from "react-redux";
import toJson from 'enzyme-to-json';

const setUp = (initialState = {}) => {
    const store = testStore(initialState);
    const wrapper = shallow(
        <Provider store={store}>
            <App/>
        </Provider>).childAt(0).dive();
    return wrapper;
}

describe('App Component', function () {
    let wrapper;
    beforeEach(() => {
        const initialState = {
            status: {
                isConnected: false,
                jobs: {}
            },
            config: {
                providers: [],
                configDump: {}
            },
            remote: {
                configs: {},
                remotes: [],
                files: {},
                hasError: false
            },
            explorer: {
                backStacks: {},
                currentPaths: {},
                visibilityFilters: {},
                gridMode: {}
            },
            providerStatus: {
                about: {}
            }
        };
        wrapper = setUp(initialState);
    });

    it('should render without errors', function () {
        const component = findByTestAtrr(wrapper, 'appComponent');
        expect(component).toHaveLength(1);

    });

    it('should match snapshot', function () {
        expect(toJson(wrapper)).toMatchSnapshot()
    });
});