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
        const newState = {
            ...state,
            imageLoader: undefined
        };
        try {
            let serializedState = JSON.stringify(newState);
            // console.log(serializedState);
            localStorage.setItem("curState", serializedState);

        } catch (err) {
            console.error("Error occurred while saving state");
            throw new Error(`Cannot Save State ${err}`);
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
