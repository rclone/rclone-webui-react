import React from "react";
import {shallow} from "enzyme";
import {findByTestAttr, testStore} from "../../../../../Utils";
import toJson from "enzyme-to-json";
import VideoPlayer from "./VideoPlayer";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    const component = shallow(<VideoPlayer {...props} store={store}/>);
    return component;
};


describe('Video Player Widget', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {};


            const props = {
                playbackURL: '',
                MimeType: ''
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAttr(wrapper, "videoPlayerWidget");
            expect(component).toHaveLength(1);
        });

        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot()
        });

    });

});