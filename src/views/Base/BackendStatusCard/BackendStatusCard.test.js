import React from "react";
import {shallow} from "enzyme";
import {Provider} from "react-redux";
import {testStore} from "../../../../Utils";
import BackendStatusCard from "./BackendStatusCard";

const setUp = (props = {}) => {
    const component = shallow(
        <Provider store={testStore()}>
            <BackendStatusCard/>
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