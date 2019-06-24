import React from "react";
import {shallow} from "enzyme";
import {findByTestAtrr, testStore} from "../../../Utils";
import toJson from "enzyme-to-json";
import RCloneDashboard from "./RCloneDashboard";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    return shallow(<RCloneDashboard {...props} store={store}/>);
};


describe('RClone Backend Component', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {};

            const props = {};
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAtrr(wrapper, "backendComponent");
            expect(component).toHaveLength(1);
        });

        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot()
        });
    });

});