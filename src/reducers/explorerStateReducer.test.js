import explorerStateReducer from "./explorerStateReducer";

describe('Explorer Reducer', function () {
    it('should return default state', function () {
        const newState = explorerStateReducer(undefined, {});
        expect(newState).toEqual({
            backStacks: {},
            currentPaths: {},
            visibilityFilters: {},
            gridMode: {},
            searchQueries: {},
            loadImages: {}
        });
    });

});