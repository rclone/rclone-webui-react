import React from "react";
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import DropOverlay from "./DropOverlay";
import {findByTestAttr, testStore} from "../../../../Utils";


const setUp = (intialState = {}, props = {}) => {
        const store = testStore(intialState);

        const component = shallow(<DropOverlay {...props} store={store}/>);
        return component;
};


describe('Drop Overlay', function () {
        describe('renders', function () {
                let wrapper;
                beforeEach(() => {
                        const initialState = {};

                        const props = {};
                        wrapper = setUp(initialState, props)
                });

                it('should render without crashing', function () {
                        const component = findByTestAttr(wrapper, "dropOverlay");
                        expect(component).toHaveLength(1);
                });

                it('should match snapshot', function () {
                        expect(toJson(wrapper)).toMatchSnapshot();
                });

        });
});
