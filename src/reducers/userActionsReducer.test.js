import userActionsReducer from "./userActionsReducer";

describe('Explorer Reducer', function () {
    it('should return default state', function () {
        const newState = userActionsReducer(undefined, {});
        expect(newState).toEqual({
            auth: {userName: "", password: "", ipAddress: "http://localhost:5572", interceptor: ""}
        });
    });

});