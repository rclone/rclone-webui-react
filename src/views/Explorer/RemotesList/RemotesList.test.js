import React from 'react';
import {testStore} from "../../../../Utils";
import {shallow} from "enzyme";
import {Provider} from "react-redux";
import RemotesList from "./RemotesList";


const setUp = (props = {}) => {
    const component = shallow(
        <Provider store={testStore()}>
            <RemotesList/>
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