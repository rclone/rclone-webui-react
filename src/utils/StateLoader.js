// Used to persist redux-state to the localStorage.
export class StateLoader {

    loadState() {
        try {
            let serializedState = localStorage.getItem("curState");

            if (serializedState === null) {
                return this.initializeState();
            }

            return JSON.parse(serializedState);
        } catch (err) {
            return this.initializeState();
        }
    }

    saveState(state) {
        try {
            let serializedState = JSON.stringify(state);
            localStorage.setItem("curState", serializedState);

        } catch (err) {
        }
    }

    initializeState() {
        return {
            //state object
        }
    };
}
