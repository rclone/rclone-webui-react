import React from "react";
import {shallow} from "enzyme";
import {Provider} from "react-redux";
import {testStore} from "../../../../Utils";
import NewFolder from "./NewFolder";

const setUp = (props = {}) => {
    const component = shallow(
        <Provider store={testStore()}>
            <NewFolder/>
        </Provider>
    );
    return component;
}

describe('New Folder', function () {

    let wrapper;
    beforeEach(() => {
        const props = {};
        wrapper = setUp(props)
    });

    it('should render without crashing', function () {
        expect(wrapper).toHaveLength(1)
    });
});