import React from "react";
import {shallow} from "enzyme";
import {Provider} from "react-redux";
import {testStore} from "../../../../Utils";
import BandwidthStatusCard from "./BandwidthStatusCard";
import toJson from "enzyme-to-json";

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
    it('should match snapshot', function () {
        expect(toJson(wrapper)).toMatchSnapshot()
    });
});