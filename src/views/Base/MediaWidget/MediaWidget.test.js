import React from "react";
import {shallow} from "enzyme";
import {testStore} from "../../../../Utils";
import toJson from "enzyme-to-json";
import MediaWidget from "./MediaWidget";
import {FILE_ITEM_DATA, TEST_REDUX_PROPS} from "../../../utils/testData";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    const component = shallow(<MediaWidget {...props} store={store}/>);
    return component.childAt(0).dive();
};

describe('New Drive Auth Modal', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const props = {
                containerID: '0',
                item: FILE_ITEM_DATA,
                inViewport: true

            };
            const initialState = {
                ...TEST_REDUX_PROPS
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