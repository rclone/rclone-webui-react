import React from "react";
import {shallow} from "enzyme";
import {Provider} from "react-redux";
import {testStore} from "../../../../Utils";
import {MemoryRouter} from "react-router-dom";
import DefaultHeader from "../DefaultHeader";

const setUp = (props = {}) => {
    const component = shallow(
        <Provider store={testStore()}>
            <MemoryRouter><DefaultHeader/></MemoryRouter>
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