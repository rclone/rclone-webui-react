import React from 'react';
import {testStore} from "../../../../Utils";
import {shallow} from "enzyme";
import {Provider} from "react-redux";
import RemoteExplorerLayout from "./RemoteExplorerLayout";


const setUp = (props = {}) => {
    const component = shallow(
        <Provider store={testStore()}>
            <RemoteExplorerLayout/>
        </Provider>
    );
    return component;
}

describe('Remote Explorer Layout', function () {

    let wrapper;
    beforeEach(() => {
        const props = {};
        wrapper = setUp(props)
    });

    it('should render without crashing', function () {
        expect(wrapper).toHaveLength(1)
    });
});