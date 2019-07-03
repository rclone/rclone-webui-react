import providerStatusReducer from "./providerStatusReducer";

describe('Explorer Reducer', function () {
    it('should return default state', function () {
        const newState = providerStatusReducer(undefined, {});
        expect(newState).toEqual({
            about: {}
        });
    });

});