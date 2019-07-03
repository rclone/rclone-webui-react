import explorerReducer from "./explorerReducer";
import {GET_CONFIG_FOR_REMOTE, REQUEST_ERROR, REQUEST_SUCCESS} from "../actions/types";

describe('Explorer Reducer', function () {
    it('should return default state', function () {
        const newState = explorerReducer(undefined, {});
        expect(newState).toEqual({
            configs: {},
            remotes: [],
            files: {},
            hasError: false,
            numCols: 0,
            distractionFreeMode: false,
        });
    });

    it('should change state for GET_CONFIG_FOR_REMOTE SUCCESS', function () {
        let remoteName = "localdrive";
        const data = {

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
            }

        };
        let newState = explorerReducer(undefined, {
            type: GET_CONFIG_FOR_REMOTE,
            status: REQUEST_SUCCESS,
            payload: {[remoteName]: data},
        });
        expect(newState.configs).toEqual({[remoteName]: data});

        const expected = newState.configs;

        remoteName = "mydrive";

        newState = explorerReducer(newState, {
            type: GET_CONFIG_FOR_REMOTE,
            status: REQUEST_SUCCESS,
            payload: {[remoteName]: data},
        });

        // Adding new entry should not wipe out previous

        expect(newState.configs).toEqual({...expected, [remoteName]: data});
        expect(newState.hasError).toBe(false);
        expect(newState.error).toBeUndefined();


    });

    it('should change state for GET_CONFIG_FOR_REMOTE ERROR', function () {
        const error = {"error": "This is an error"};

        const newState = explorerReducer(undefined, {
            type: GET_CONFIG_FOR_REMOTE,
            status: REQUEST_ERROR,
            payload: error
        });

        expect(newState.hasError).toBe(true);
        expect(newState.error).toEqual(error);
    });
});