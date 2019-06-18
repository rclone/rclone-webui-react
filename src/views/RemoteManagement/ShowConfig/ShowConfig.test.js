import React from "react";
import {shallow} from "enzyme";
import {findByTestAtrr, testStore} from "../../../../Utils";
import ShowConfig from "./ShowConfig";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    const component = shallow(<ShowConfig {...props} store={store}/>);
    return component.childAt(0).dive();
};


describe('Show Config', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {
                remote: {
                    files: {
                        'localdrive-': {
                            time: '2019-06-18T06:49:00.107Z',
                            files: []
                        }
                    },

                },
                config: {
                    providers: [
                        {
                            Name: 'alias',
                            Description: 'Alias for an existing remote',
                            Prefix: 'alias',
                            Options: [
                                {
                                    Name: 'remote',
                                    Help: 'Remote or path to alias.\nCan be "myremote:path/to/dir", "myremote:bucket", "myremote:" or "/local/path".',
                                    Provider: '',
                                    Default: '',
                                    Value: null,
                                    ShortOpt: '',
                                    Hide: 0,
                                    Required: true,
                                    IsPassword: false,
                                    NoPrefix: false,
                                    Advanced: false,
                                    DefaultStr: '',
                                    ValueStr: '',
                                    Type: 'string'
                                }
                            ]
                        }
                    ],
                    configDump: {
                        eventsfunk: {},
                    }
                }
            };


            const props = {};
            wrapper = setUp(initialState, props)
        });

        it('should render without crashing', function () {
            const component = findByTestAtrr(wrapper, "showConfigComponent")
            expect(component).toHaveLength(1);
        });

    });

});