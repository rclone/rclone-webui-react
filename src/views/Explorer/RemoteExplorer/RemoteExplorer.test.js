import React from "react";
import {shallow} from "enzyme";
import {testStore} from "../../../../Utils";
import RemoteExplorer from "./RemoteExplorer";
import toJson from "enzyme-to-json";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    const component = shallow(<RemoteExplorer {...props} store={store}/>);
    return component.childAt(0).dive();
};


describe('Remote Explorer', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {
                remote: {
                    config: {
                        files: {
                            'localdrive-': {
                                time: '2019-06-18T06:49:00.107Z',
                                files: []
                            }
                        }
                    }
                },
                explorer: {
                    backStacks: {
                        '0': {
                            backStack: {
                                items: [
                                    {
                                        remoteName: 'localdrive',
                                        remotePath: ''
                                    }
                                ],
                                count: 1
                            },
                            forwardStack: {
                                items: [],
                                count: 0
                            }
                        }
                    },
                    currentPaths: {
                        '0': {
                            remoteName: 'localdrive',
                            remotePath: ''
                        }
                    },
                    visibilityFilters: {},
                    gridMode: {}
                }


            };

            const props = {
                containerID: '0',
                createPath: jest.fn()
            };
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            expect(wrapper).toHaveLength(1)
        });

        it('should match snapshot', function () {
            expect(toJson(wrapper)).toMatchSnapshot()
        });

    });

});