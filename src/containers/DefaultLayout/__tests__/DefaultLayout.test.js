import React from 'react';
import {MemoryRouter, Route} from 'react-router-dom';
import DefaultLayout from '../DefaultLayout';
import {shallow} from "enzyme";
import {Provider} from "react-redux";
import {testStore} from "../../../../Utils";

const setUp = (props = {}) => {
    const component = shallow(
        <Provider store={testStore()}>
            <MemoryRouter><Route path="/" name="Home" component={DefaultLayout}/></MemoryRouter>
        </Provider>
    );
    return component;
}

describe('Backend Status Card', function () {

    let wrapper;
    beforeEach(() => {
        const props = {};
        wrapper = setUp(props)
    });

    it('should render without crashing', function () {
        expect(wrapper).toHaveLength(1)
    });
});
