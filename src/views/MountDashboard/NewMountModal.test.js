import React from "react";
import {shallow} from "enzyme";
import {findByTestAttr, testStore} from "../../../Utils";
import toJson from "enzyme-to-json";
import NewMountModal from "./NewMountModal";


const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);

    const component = shallow(<NewMountModal {...props} store={store}/>);
    return component;
};


describe('New Mount Modal', function () {
    describe('renders', function () {
        const myMock = jest.fn();
        let wrapper;
        beforeEach(() => {
            const initialState = {};

            const props = {
                okHandle: myMock
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAttr(wrapper, "newMountModalComponent");
            expect(component).toHaveLength(1);
        });

        it('should have ok and cancel buttons', function () {
            const okButton = findByTestAttr(wrapper, "ok-button")
            expect(okButton).toHaveLength(1);

            const cancelButton = findByTestAttr(wrapper, "cancel-button");
            expect(cancelButton).toHaveLength(1);
        })


        it('okHandle should have been called once', function () {
            const okButton = findByTestAttr(wrapper, "ok-button")
            okButton.simulate('click');

            expect(myMock.mock.calls).toHaveLength(1);
        })

        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot();
        });

    });
});
