import React from "react";
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import DashboardPlugin from "./DashboardPlugin";
import {findByTestAttr, testStore} from "../../../../Utils";


const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);

    const component = shallow(<DashboardPlugin {...props} store={store}/>);
    return component;
};


describe('Dashboard Plugin', function () {

    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {};

            const props = {
                pluginUrl: ""
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAttr(wrapper, "dashboardPluginComponent");
            expect(component).toHaveLength(1);
        });

        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot()
        });
    });

});
