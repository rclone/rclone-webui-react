import React from "react";
import {shallow} from "enzyme";
import {testStore} from "../../../../Utils";
import FileOperations from "./FileOperations";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    const component = shallow(<FileOperations {...props} store={store}/>);
    return component.childAt(0).dive();
};


describe('File Operations', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {

                explorer: {
                    visibilityFilters: {"1": "Images"},
                    gridMode: {
                        "1": "card"
                    }
                }

            };

            const props = {
                containerID: "1",
                changeVisibilityFilter: jest.fn()
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            expect(wrapper).toHaveLength(1)
        });
    });
});