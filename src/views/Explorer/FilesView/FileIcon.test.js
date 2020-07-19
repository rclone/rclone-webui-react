import React from "react";
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import FileIcon from "./FileIcon";
import {findByTestAttr, testStore} from "../../../../Utils";


const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);

    const component = shallow(<FileIcon {...props} store={store}/>);
    return component;
};


describe('New Mount Modal', function () {
    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {};

            const props = {
                IsDir: false,
                MimeType: "text/plain"
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAttr(wrapper, "fileIconComponent");
            expect(component).toHaveLength(1);
        });


        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot();
        });

    });
});
