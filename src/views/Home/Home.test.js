import React from "react";
import {shallow} from "enzyme";
import {findByTestAttr, testStore} from "../../../Utils";
import Home from "./Home";
import toJson from "enzyme-to-json";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);

    const component = shallow(<Home {...props} store={store}/>);
    return component.childAt(0).dive();
};


describe('Home Component', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {
                status: {
                    checkStatus: true
                }
            };

            const props = {};
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAttr(wrapper, "homeComponent");
            expect(component).toHaveLength(1);
        });

        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot()
        });
    });

});