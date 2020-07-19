import React from "react";
import {shallow} from "enzyme";
import {testStore} from "../../../../Utils";
import toJson from "enzyme-to-json";
import {TEST_REDUX_PROPS} from "../../../utils/testData";
import TabbedPanes from "./TabbedPanes";

const setUp = (initialState = {}, props = {}) => {
    const store = testStore(initialState);
    const component = shallow(<TabbedPanes {...props} store={store}/>);
    return component;
};


describe('Tabbed Panes', function () {

    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {

                ...TEST_REDUX_PROPS
            };

            const props = {
                numCols: 1,
                activeRemoteContainerID: {0: "AAA"},
                distractionFreeMode: false,
                containers: [{ID: "AAA", paneID: 0}]
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