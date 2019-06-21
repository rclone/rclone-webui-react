import React from "react";
import {shallow} from "enzyme";
import {findByTestAtrr, testStore} from "../../../Utils";
import Home from "./Home";
import toJson from "enzyme-to-json";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    return shallow(<Home {...props} store={store}/>);
};


describe('Home Component', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {};

            const props = {};
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAtrr(wrapper, "homeComponent");
            expect(component).toHaveLength(1);
        });

        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot()
        });
    });

});