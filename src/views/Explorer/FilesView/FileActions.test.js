import React from "react";
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import FileActions from "./FileActions";
import {findByTestAttr, testStore} from "../../../../Utils";
import {FILE_ITEM_DATA} from "../../../utils/testData";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);

    const component = shallow(<FileActions {...props} store={store}/>);
    return component;
};


describe('File Actions', function () {
    describe('renders', function () {
        let wrapper;
        let downloadHandle = jest.fn();
        let deleteHandle = jest.fn();
        let linkShareHandle = jest.fn();
        beforeEach(() => {
            const initialState = {};

            const props = {
                item: FILE_ITEM_DATA,
                downloadHandle,
                deleteHandle,
                linkShareHandle
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAttr(wrapper, "fileActionsComponent");
            expect(component).toHaveLength(1);
        });
        it('should contain buttons', function () {
            const downloadButton = findByTestAttr(wrapper, "btn-download");
            expect(downloadButton).toHaveLength(1);

            const shareWithLinkButton = findByTestAttr(wrapper, "btn-share-with-link");
            expect(shareWithLinkButton).toHaveLength(1);

            const deleteItemButton = findByTestAttr(wrapper, "btn-delete-item");
            expect(deleteItemButton).toHaveLength(1);

        });

        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot();
        });

    });
});
