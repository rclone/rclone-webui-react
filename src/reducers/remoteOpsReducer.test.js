import remoteOpsReducer from "./remoteOpsReducer";

describe('Explorer Reducer', function () {
    it('should return default state', function () {
        const newState = remoteOpsReducer(undefined, {});
        expect(newState).toEqual({
            runningJobs: [],
            runningJobsFetchError: {},
            jobStatus: {}
        });
    });

});