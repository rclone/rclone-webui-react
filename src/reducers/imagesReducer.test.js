import imagesReducer from "./imagesReducer";

describe('Explorer Reducer', function () {
    it('should return default state', function () {
        const newState = imagesReducer(undefined, {});
        expect(newState).toEqual({});
    });

});