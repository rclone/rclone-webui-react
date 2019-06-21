import React from "react";
import {shallow} from "enzyme";
import {testStore} from "../../../../Utils";
import FilesView from "./FilesView";
import toJson from "enzyme-to-json";

const setUp = (intialState = {}, props = {}) => {
    const store = testStore(intialState);
    const component = shallow(<FilesView {...props} store={store}/>);
    return component.childAt(0).dive();
};


describe('Files View', function () {


    describe('renders', function () {
        let wrapper;
        beforeEach(() => {
            const initialState = {

                remote: {
                    configs: {
                        localdrive: {
                            Features: {
                                About: true,
                                BucketBased: false,
                                CanHaveEmptyDirectories: true,
                                CaseInsensitive: false,
                                ChangeNotify: false,
                                CleanUp: false,
                                Copy: false,
                                DirCacheFlush: false,
                                DirMove: true,
                                DuplicateFiles: false,
                                GetTier: false,
                                ListR: false,
                                MergeDirs: false,
                                Move: true,
                                OpenWriterAt: true,
                                PublicLink: false,
                                Purge: true,
                                PutStream: true,
                                PutUnchecked: false,
                                ReadMimeType: false,
                                ServerSideAcrossConfigs: false,
                                SetTier: false,
                                SetWrapper: false,
                                UnWrap: false,
                                WrapFs: false,
                                WriteMimeType: false
                            },
                            Hashes: [
                                'MD5',
                                'SHA-1',
                                'DropboxHash',
                                'QuickXorHash'
                            ],
                            Name: 'localdrive',
                            Precision: 1,
                            Root: '/home/negative0/Projects/rclone/rclone',
                            String: 'Local file system at /home/negative0/Projects/rclone/rclone'
                        }
                    },
                    files: {
                        'localdrive-': {
                            time: '2019-06-18T06:49:00.107Z',
                            files: []
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
                    gridMode: {},
                    searchQueries: {}
                }


            };

            const props = {
                containerID: '0',
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