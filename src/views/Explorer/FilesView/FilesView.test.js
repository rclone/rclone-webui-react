import React from "react";
import {shallow} from "enzyme";
import {testStore} from "../../../../Utils";
import FilesView from "./FilesView";
import toJson from "enzyme-to-json";
import {wrapInTestContext} from "react-dnd-test-utils";
import {TEST_REDUX_PROPS} from "../../../utils/testData";
import {PROP_CONTAINER_ID} from "../../../utils/RclonePropTypes";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    const MyFiles = wrapInTestContext(FilesView);
    const component = shallow(<MyFiles {...props} store={store}/>);
    const manager = component.instance().getManager();
    const backend = manager.getBackend()
    return component.childAt(0).dive();
};


describe('Files View', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {

                ...TEST_REDUX_PROPS
            };

            const props = {
                containerID: PROP_CONTAINER_ID,
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