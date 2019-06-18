import React from "react";
import {shallow} from "enzyme";
import {testStore} from "../../../../Utils";
import NewFolder from "./NewFolder";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    const component = shallow(<NewFolder {...props} store={store}/>);
    return component.childAt(0).dive();
}

describe('New Folder', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const props = {
                isVisible: true,
                closeModal: jest.fn(),
                containerID: "1"
            };
            const initialState = {};
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            expect(wrapper).toHaveLength(1)
        });
    });


});