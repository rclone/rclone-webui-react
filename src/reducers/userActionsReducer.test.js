import userActionsReducer from "./userActionsReducer";

describe('User Actions Reducer', function () {
    it('should return default state', function () {
        const newState = userActionsReducer(undefined, {});
        expect(newState).toEqual({
            auth: {authKey: "", ipAddress: "http://localhost:5572", interceptor: ""}
        });
    });

});