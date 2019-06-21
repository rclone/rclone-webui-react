import React from "react";
import {shallow} from "enzyme";
import {testStore} from "../../../../Utils";
import RunningJobs from "./RunningJobs";
import toJson from "enzyme-to-json";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    const component = shallow(<RunningJobs {...props} store={store}/>);
    return component.childAt(0).dive();
};


describe('Running Jobs', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {
                status: {
                    jobs: {
                        "transferring": {}
                    },
                    isConnected: true,
                    error: {}
                }
            };

            const props = {
                mode: "full-status"
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