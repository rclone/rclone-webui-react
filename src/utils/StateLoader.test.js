import {testStore} from "../../Utils";
import {StateLoader} from "./StateLoader";
import {TEST_REDUX_PROPS} from "./testData";

describe('check state loading ', function () {
    let store = {};
    let stateLoader;
    beforeEach(() => {
        stateLoader = new StateLoader();
        store = testStore({...TEST_REDUX_PROPS});
    });

    function saveState() {
        const curState = store.getState();
        /*Images are not persisted onto localStorage*/
        curState.imageLoader = undefined;
        stateLoader.saveState(curState);
        return curState;
    }

    it('should save state properly', function () {
        const curState = saveState();
        let serializedState = JSON.stringify(curState);
        expect(localStorage.curState).toEqual(serializedState);
    });

    it('should load state properly', function () {

        const tempState = {...TEST_REDUX_PROPS};
        let serializedState = JSON.stringify(tempState);


        localStorage.setItem("curState", serializedState);
        expect(stateLoader.loadState()).toEqual(tempState);


    });

    it('should empty state if error occurs', function () {
        localStorage.setItem("curState", 'asas');
        expect(stateLoader.loadState()).toEqual(stateLoader.initializeState());
    });

    // it('should empty state if error occurs', function () {
    //     expect(() => stateLoader.saveState('{}{{{}{{}')).toThrow(Error);
    // });
});

