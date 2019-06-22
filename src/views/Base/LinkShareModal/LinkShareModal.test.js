import React from "react";
import LinkShareModal from "./LinkShareModal";
import {testStore} from "../../../../Utils";
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    const component = shallow(<LinkShareModal {...props} store={store}/>);
    return component.childAt(0).dive();
}

describe('Link Share Modal', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const props = {
                isVisible: true,
                closeModal: jest.fn(),
                linkUrl: ""
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

//
// // TODO: Write testcase for failing component when using document.
// it('should 1 === 1', function () {
//     expect(1).toBe(1)
// });