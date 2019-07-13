import React from "react";
import {shallow} from "enzyme";
import {testStore} from "../../../../Utils";
import FileOperations from "./FileOperations";
import toJson from "enzyme-to-json";
import {TEST_FILE_CONTAINER_ID, TEST_REDUX_PROPS} from "../../../utils/testData";

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

                ...TEST_REDUX_PROPS

            };

            const props = {
                containerID: TEST_FILE_CONTAINER_ID,
                changeVisibilityFilter: jest.fn()
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            expect(wrapper).toHaveLength(1)
        });

        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot()
        });
    });
});