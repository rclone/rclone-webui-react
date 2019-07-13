import React from "react";
import {shallow} from "enzyme";
import {findByTestAttr, testStore} from "../../../../Utils";
import toJson from "enzyme-to-json";
import {TEST_REDUX_PROPS} from "../../../utils/testData";
import ConfigRow from "./ConfigRow";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    // Wrapped component is required to bypass the withRouter HOC and render only the component
    const component = shallow(<ConfigRow.WrappedComponent {...props} store={store}/>);
    return component;
};


describe('Config Row', function () {

    let refreshHandle = jest.fn();

    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {
                ...TEST_REDUX_PROPS
            };
            const props = {
                sequenceNumber: 1,
                key: 1,
                remoteName: 'local',
                remote: {
                    token: '',
                    type: 'drive'
                },
                refreshHandle: refreshHandle
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAttr(wrapper, "configRowComponent");
            expect(component).toHaveLength(1);
        });

        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot()
        });

    });

});