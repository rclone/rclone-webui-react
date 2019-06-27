// Used to persist redux-state to the localStorage.
export class StateLoader {

    /**
     * It loads the redux state from the local store.
     * @returns {{}|any}
     */
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

    /**
     * Saves the current state to the localStore with variable name curState.
     * BEWARE: Uses expensive operation JSON.stringify(). May cause performance issues. Any alternative is welcome.
     * @param state {$ObjMap} The current state to be saved.
     */
    saveState(state) {
        try {
            let serializedState = JSON.stringify(state);
            localStorage.setItem("curState", serializedState);

        } catch (err) {
        }
    }

    /**
     * Initializes the redux state with an empty map {}.
     * @returns {{}}
     */
    initializeState() {
        return {
            //state object
        }
    };
}
