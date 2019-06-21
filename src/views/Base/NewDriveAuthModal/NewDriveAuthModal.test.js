import React from "react";
import NewDriveAuthModal from "./NewDriveAuthModal";
import {shallow} from "enzyme";
import {testStore} from "../../../../Utils";
import toJson from "enzyme-to-json";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    const component = shallow(<NewDriveAuthModal {...props} store={store}/>);
    return component.childAt(0).dive();
}

describe('New Drive Auth Modal', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const props = {
                isVisible: true,
                closeModal: jest.fn()
            };
            const initialState = {};
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