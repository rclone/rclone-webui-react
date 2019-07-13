import React from "react";
import {shallow} from "enzyme";
import {checkProps, findByTestAttr, testStore} from "../../../../Utils";
import RemoteExplorerLayout from "./RemoteExplorerLayout";
import toJson from "enzyme-to-json";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    let component = shallow(<RemoteExplorerLayout {...props} store={store}/>);
    component = component.childAt(0).dive().childAt(0).dive().childAt(0).dive();
    return component;
};


describe('Remote Explorer Layout', function () {

    describe('Checking PropTypes', () => {

        it('Should NOT throw a warning', () => {
            const expectedProps = {};
            const propsError = checkProps(RemoteExplorerLayout, expectedProps);
            expect(propsError).toBeUndefined();
        });

    });


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {};

            const props = {
                createPath: jest.fn()
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAttr(wrapper, "remoteExplorerLayout");
            expect(component).toHaveLength(1);
        });

        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot()
        });


    });




});