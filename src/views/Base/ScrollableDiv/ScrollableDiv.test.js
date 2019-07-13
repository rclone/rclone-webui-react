import React from "react";
import {shallow} from "enzyme";
import {testStore} from "../../../../Utils";
import toJson from "enzyme-to-json";
import ScrollableDiv from "./ScrollableDiv";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    const component = shallow(<ScrollableDiv {...props} store={store}/>);
    return component;
};


describe('Running Jobs', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {};

            const props = {
                height: '700px',
                children: <div/>
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