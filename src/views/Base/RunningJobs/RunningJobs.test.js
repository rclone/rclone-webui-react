import React from "react";
import RunningJobs from "./RunningJobs";
import {testStore} from "../../../../Utils";
import {shallow} from "enzyme";
import {Provider} from "react-redux";


const setUp = (props = {}) => {
    const component = shallow(
        <Provider store={testStore()}>
            <RunningJobs mode={"full-status"}/>
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