import React from "react";
import {shallow} from "enzyme";
import {findByTestAtrr, testStore} from "../../../../Utils";
import NewFolder from "./NewFolder";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    const component = shallow(<NewFolder {...props} store={store}/>);
    return component.childAt(0).dive();
};

describe('New Folder', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const props = {
                isVisible: true,
                closeModal: jest.fn(),
                containerID: "1"
            };
            const initialState = {
                explorer: {
                    currentPaths: {
                        "1": {remoteName: "mydrive", remotePath: ""}
                    }
                }
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAtrr(wrapper, "newFolderComponent");
            expect(component).toHaveLength(1);
        });
    });


});