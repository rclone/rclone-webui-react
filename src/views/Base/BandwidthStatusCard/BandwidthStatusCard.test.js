import React from "react";
import {shallow} from "enzyme";
import {Provider} from "react-redux";
import {testStore} from "../../../../Utils";
import BandwidthStatusCard from "./BandwidthStatusCard";

const setUp = (props = {}) => {
    const component = shallow(
        <Provider store={testStore()}>
            <BandwidthStatusCard/>
        </Provider>
    );
    return component;
}

describe('Bandwidth Status Card', function () {

    let wrapper;
    beforeEach(() => {
        const props = {};
        wrapper = setUp(props)
    });

    it('should render without crashing', function () {
        expect(wrapper).toHaveLength(1)
    });
});