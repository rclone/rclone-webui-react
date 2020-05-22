import React from "react";
import {shallow} from "enzyme";
import {findByTestAttr, testStore} from "../../../Utils";
import toJson from "enzyme-to-json";
import PluginsDashboard from "./PluginsDashboard";

const setUp = (intialState = {}, props = {}) => {
	const store = testStore(intialState);

	const component = shallow(<PluginsDashboard {...props} store={store}/>);
	return component.childAt(0).dive();
};


describe('Plugins Dashboard', () => {
}, function () {
	describe('renders', function () {
		let wrapper;
		beforeEach(() => {
			const initialState = {
				status: {
					checkStatus: true
				}
			};

			const props = {};
			wrapper = setUp(initialState, props)
		});

		it('should render without crashing', function () {
			const component = findByTestAttr(wrapper, "pluginsDashboardComponent");
			expect(component).toHaveLength(1);
		});

		it('should match snapshot', function () {
			expect(toJson(wrapper)).toMatchSnapshot()
		});
	});

});
