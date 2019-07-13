import React from "react";
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import DefaultLayout from "./DefaultLayout";
import {TEST_REDUX_PROPS} from "../../utils/testData";
import {findByTestAttr, testStore} from "../../../Utils";

const setUp = (initialState = {}, props = {}) => {
    const store = testStore(initialState);
    const component = shallow(<DefaultLayout {...props} store={store}/>);
    return component.childAt(0).dive();
};


describe('Remote Explorer', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {
                ...TEST_REDUX_PROPS
            };


            const props = {

                history: {
                    push: jest.fn()
                }

            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAttr(wrapper, "defaultLayout");
            expect(component).toHaveLength(1);
        });
        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot()
        });
    });

});