import React from "react";
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import {findByTestAttr, testStore} from "../../../Utils";
import PluginPlaceHolderCard from "./PluginPlaceHolderCard";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);

    const component = shallow(<PluginPlaceHolderCard {...props} store={store}/>);
    return component;
};


describe('Plugin place holder', function () {
    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {};

            const props = {
                plugin: {
                    "name": "Video Player",
                    "description": "A video player for rclone",
                    "author": "negative0",
                    "longDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "icon": "",
                    "repo": "https://github.com/negative0/rclone-video-plugin/",
                    "bugs": "https://github.com/negative0/rclone-video-plugin/issues"
                },
                getPlugins: jest.fn()

            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAttr(wrapper, "pluginPlaceHolder");
            expect(component).toHaveLength(1);
        });

        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot();
        });

    });
});
