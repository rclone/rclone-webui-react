import React from "react";
import {shallow} from "enzyme";
import {findByTestAttr, testStore} from "../../../Utils";
import toJson from "enzyme-to-json";
import StoreDashboard from "./StoreDashboard";


const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);

    const component = shallow(<StoreDashboard {...props} store={store}/>);
    return component.childAt(0).dive();
};


describe('Store Dashboard', function () {

    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {};

            const props = {
                loadedPlugins: [],
                getPlugins: jest.fn(),
                addPlugin: jest.fn()
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAttr(wrapper, "storeDashboardComponent");
            expect(component).toHaveLength(1);
        });

        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot()
        });
    });

});
