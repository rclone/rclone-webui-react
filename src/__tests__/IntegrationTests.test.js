import {mount} from "enzyme";
import App from "../App";
import {Provider} from "react-redux";
import React from "react";
import {testStore} from "../../Utils";

const setUp = (initialState = {}) => {
    const store = testStore(initialState);
    const wrapper = mount(
        <Provider store={store}>
            <App/>
        </Provider>);
    return wrapper;
};

describe('App should run properly', function () {
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

    it('should mount successfully', function () {
        expect(wrapper).not.toBe(null);
    });
});