import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import Login from './Login';
import {shallow} from "enzyme/build";
import {Provider} from "react-redux";
import {testStore} from "../../../../Utils";

const setUp = (props = {}) => {
    const component = shallow(
        <Provider store={testStore()}>
            <MemoryRouter><Login/></MemoryRouter>
        </Provider>
    );
    return component;
}

describe('Login Page', function () {

    let wrapper;
    beforeEach(() => {
        const props = {};
        wrapper = setUp(props)
    });

    it('should render without crashing', function () {
        expect(wrapper).toHaveLength(1)
    });
});