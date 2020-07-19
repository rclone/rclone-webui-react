import React from "react";
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import FileUploadModal from "./FileUploadModal";
import {findByTestAttr, testStore} from "../../../../Utils";


const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);

    const component = shallow(<FileUploadModal {...props} store={store}/>);
    return component;
};


describe('File upload Modal', function () {
    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {};

            const props = {
                currentPath: {
                    remoteName: "local",
                    remotePath: ""
                }
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAttr(wrapper, "fileUploadModalComponent");
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
