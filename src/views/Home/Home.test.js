import React from "react";
import {shallow} from "enzyme";
import {Provider} from "react-redux";
import {testStore} from "../../../Utils";
import Home from "./Home";

const setUp = (props = {}) => {
    const component = shallow(
        <Provider store={testStore()}>
            <Home/>
        </Provider>
    );
    return component;
}

describe('Home container', function () {

    let wrapper;
    beforeEach(() => {
        const props = {};
        wrapper = setUp(props)
    });

    it('should render without crashing', function () {
        expect(wrapper).toHaveLength(1)
    });
});