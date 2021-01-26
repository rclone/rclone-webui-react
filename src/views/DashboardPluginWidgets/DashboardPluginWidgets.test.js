import React from "react";
import {shallow} from "enzyme";
import {findByTestAttr, testStore} from "../../../Utils";
import toJson from "enzyme-to-json";
import DashboardPluginWidgets from "./DashboardPluginWidgets";


const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);

    const component = shallow(<DashboardPluginWidgets {...props} store={store}/>);
    return component.childAt(0).dive();
};


describe('Dashboard Plugin Widget', function () {

    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {};

            const props = {};
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAttr(wrapper, "dashboardPluginWidget");
            expect(component).toHaveLength(1);
        });

        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot()
        });
    });

});
