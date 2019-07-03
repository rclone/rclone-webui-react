import statusReducer from "./statusReducer";

describe('Explorer Reducer', function () {
    it('should return default state', function () {
        const newState = statusReducer(undefined, {});
        expect(newState).toEqual({
            isConnected: false,
            jobs: {},
            speed: [],
            runningAvgSpeed: 0,
            checkStatus: true,
            bandwidth: {}
        });
    });

});