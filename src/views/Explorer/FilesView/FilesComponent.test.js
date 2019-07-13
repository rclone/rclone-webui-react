import React from "react";
import {shallow} from "enzyme";
import {testStore} from "../../../../Utils";
import toJson from "enzyme-to-json";
import {FILE_ITEM_DATA, TEST_REDUX_PROPS} from "../../../utils/testData";
import {PROP_CONTAINER_ID} from "../../../utils/RclonePropTypes";
import FileComponent from "./FileComponent";

const setUp = (initialState = {}, props = {}) => {
    const store = testStore(initialState);
    const component = shallow(<FileComponent {...props} store={store}/>);
    return component;
};


describe('Files Component', function () {

    let clickHandler = jest.fn();
    let downloadHandler = jest.fn();
    let linkShareHandle = jest.fn();
    let deleteHandler = jest.fn();


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {

                ...TEST_REDUX_PROPS
            };

            const props = {
                item: FILE_ITEM_DATA,
                clickHandler: clickHandler,
                downloadHandle: downloadHandler,
                deleteHandle: deleteHandler,
                linkShareHandle: linkShareHandle,
                remoteName: 'local',
                remotePath: 'abc',
                gridMode: 'card',
                containerID: PROP_CONTAINER_ID,
                canMove: true,
                canCopy: true,
                loadImages: false,
                isBucketBased: false
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