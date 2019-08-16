import React from "react";
import {shallow} from "enzyme";
import {findByTestAttr, testStore} from "../../../../Utils";
import Login from "./Login";
import {MemoryRouter} from "react-router-dom";
import toJson from "enzyme-to-json";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    let component = shallow(<MemoryRouter><Login store={store} {...props}/></MemoryRouter>);
    component = component.childAt(0).dive().dive();
    // console.log(component.debug());
    return component;
};


describe('Login Layout', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {};

            const props = {};
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAttr(wrapper, "loginComponent");
            expect(component).toHaveLength(1);
        });
        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot()
        });
    });


});