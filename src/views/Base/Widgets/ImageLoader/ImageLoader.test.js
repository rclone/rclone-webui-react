import React from "react";
import {shallow} from "enzyme";
import {testStore} from "../../../../../Utils";
import toJson from "enzyme-to-json";
import {TEST_FILE_CONTAINER_ID, TEST_REDUX_PROPS} from "../../../../utils/testData";
import ImageLoader from "./ImageLoader";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    const component = shallow(<ImageLoader {...props} store={store}/>);
    return component.childAt(0).dive();
};


describe('Image Loader', function () {


    describe('renders Loader', function () {
        let wrapper;
        const setState = jest.fn();
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, setState]);


        beforeEach(() => {
            const initialState = {

                ...TEST_REDUX_PROPS,

            };

            const props = {
                containerID: TEST_FILE_CONTAINER_ID,
                changeVisibilityFilter: jest.fn()
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            expect(wrapper).toHaveLength(1)
        });

        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot()
        });
        // it('should render full mode', function () {
        //     const e = { stopPropagation: jest.fn() };
        //     const result = findByTestAttr(wrapper, 'toggleModal').props().onClick(e);
        //     expect(result.length).toBe(1);
        // });
    });

    describe('renders Image', function () {
        let wrapper;

        beforeEach(() => {
            const initialState = {

                ...TEST_REDUX_PROPS,

                imageLoader: {
                    'http://testurl.com/1.jpg': {
                        data: 'blob://abc'
                    }
                }

            };

            const props = {
                containerID: TEST_FILE_CONTAINER_ID,
                changeVisibilityFilter: jest.fn(),
                downloadURL: 'http://testurl.com/1.jpg'
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            expect(wrapper).toHaveLength(1)
        });

        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot()
        });
        // it('should render full mode', function () {
        //     const e = { stopPropagation: jest.fn() };
        //     const result = findByTestAttr(wrapper, 'toggleModal').props().onClick(e);
        //     expect(result.length).toBe(1);
        // });
    });

});