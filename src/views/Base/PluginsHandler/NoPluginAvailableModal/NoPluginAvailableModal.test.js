import React from "react";
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import {findByTestAttr, testStore} from "../../../../../Utils";
import NoPluginAvailableModal from "./NoPluginAvailableModal";


const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);

    const component = shallow(<NoPluginAvailableModal {...props} store={store}/>);
    return component;
};


describe('No plugin available Modal', function () {
    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {};

            const props = {
                className: "",
                isOpen: true,
                setIsOpen: jest.fn(),
                availablePlugins: [],
                processOpenPlugin: jest.fn()
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAttr(wrapper, "noPluginAvailableModal");
            expect(component).toHaveLength(1);
        });

        it('should have ok and cancel buttons', function () {
            const okButton = findByTestAttr(wrapper, "ok-button")
            expect(okButton).toHaveLength(1);

            const cancelButton = findByTestAttr(wrapper, "cancel-button");
            expect(cancelButton).toHaveLength(1);
        })


        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot();
        });

    });
});
