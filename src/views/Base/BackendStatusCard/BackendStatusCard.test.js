import React from "react";
import {shallow} from "enzyme";
import {testStore} from "../../../../Utils";
import BackendStatusCard from "./BackendStatusCard";
import toJson from "enzyme-to-json";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    const component = shallow(<BackendStatusCard {...props} store={store}/>);
    return component.childAt(0).dive();
}

describe('Backend Status Card', function () {

    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const props = {};
            const initialState = {
                status: {
                    isConnected: false,
                    jobs: {},
                    checkStatus: true
                },
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            expect(wrapper).toHaveLength(1)
        });

        it('should match Snapshot', function () {

        });

        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot()
        });
    });



});