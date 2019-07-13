import React from "react";
import {shallow} from "enzyme";
import {findByTestAttr, testStore} from "../../../../Utils";
import NewDrive from "./NewDrive";
import toJson from "enzyme-to-json";
import {TEST_REDUX_PROPS} from "../../../utils/testData";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    const component = shallow(<NewDrive {...props} store={store}/>);
    return component.childAt(0).dive();
};


describe('Remote Explorer', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {
                ...TEST_REDUX_PROPS
            };


            const props = {
                match: {
                    params: {
                        drivePrefix: ""
                    }
                }
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAttr(wrapper, "newDriveComponent");
            expect(component).toHaveLength(1);
        });
        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot()
        });
    });

});