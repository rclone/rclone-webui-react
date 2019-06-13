import {
    CHANGE_PATH,
    CHANGE_REMOTE_NAME,
    CHANGE_REMOTE_PATH,
    CREATE_PATH,
    NAVIGATE_BACK,
    NAVIGATE_FWD,
    NAVIGATE_UP
} from "../actions/types";
import BackStack from "../utils/BackStack";

const initialState = {
    backStacks: {},
    currentPaths: {}
};


export default function (state = initialState, action) {
    // const id = action.id?action.id:"";
    // let array = state.backStacks[id];
    // if(!array) array = [];
    //
    // let arrayLen = array.length - 1 ;
    //
    // const remoteName = action.remoteName;
    // const remotePath = action.remotePath;
    //
    // const data = {
    //     remoteName: remoteName,
    //     remotePath: remotePath
    // };
    //
    // let ptr = state.pointers[id];
    //
    //
    // switch (action.type) {
    //     case CHANGE_PATH:
    //         array.push(data);
    //         ptr++;
    //         break;
    //
    //     case CHANGE_REMOTE_NAME:
    //         console.log("CHange remote name", remoteName, remotePath)
    //         array.push({remoteName: remoteName, remotePath: ""});
    //         ptr++;
    //         break;
    //
    //     case CHANGE_REMOTE_PATH:
    //         array.push({remoteName: array[arrayLen].remoteName, remotePath: remotePath});
    //         ptr++;
    //         break;
    //
    //     case CREATE_PATH:
    //         array = [];
    //         data.remoteName = "";
    //         data.remotePath = "";
    //         array.push(data);
    //
    //         ptr=0;
    //         break;
    //
    //     case NAVIGATE_UP:
    //         // TODO: Write logic for up, which will navigate one directory up
    //         let current = array[arrayLen];
    //         if(current.remotePath && current.remotePath !== ""){
    //             current.remotePath = "";
    //             const splitPath = current.remotePath.split('/');
    //             for(let i=0;i<splitPath.length-1;i++){
    //                 current.remotePath = splitPath[i];
    //             }
    //         }
    //         array[arrayLen] = current;
    //         break;
    //
    //     case NAVIGATE_FWD:
    //         if(ptr < array.length){
    //             ptr--;
    //         }
    //         break;
    //
    //     case NAVIGATE_BACK:
    //         if(ptr>0){
    //             ptr++;
    //         }
    //         break;


    const id = action.id;
    // console.log(action.type);
    if (id) {

        let backStack = state.backStacks[id];
        if (!backStack) backStack = new BackStack();


        // let arrayLen = array.length - 1 ;

        let remoteName = action.remoteName;
        let remotePath = action.remotePath;

        if (!remoteName) remoteName = "";
        if (!remotePath) remotePath = "";
        const data = {
            remoteName: remoteName,
            remotePath: remotePath
        };


        switch (action.type) {
            case CHANGE_PATH:
                backStack.push(data);
                break;

            case CHANGE_REMOTE_NAME:
                // console.log("CHange remote name", remoteName, remotePath)
                backStack.empty();
                backStack.push({remoteName: remoteName, remotePath: ""});
                // ptr++;

                break;

            case CHANGE_REMOTE_PATH:
                backStack.push({remoteName: backStack.peek().remoteName, remotePath: remotePath});
                // ptr++;

                break;

            case CREATE_PATH:
                backStack = new BackStack();
                break;

            case NAVIGATE_UP:
                // TODO: Write logic for up, which will navigate one directory up
                let current = backStack.pop();
                if (current.remotePath && current.remotePath !== "") {
                    const splitPath = current.remotePath.split('/');
                    current.remotePath = "";
                    if (splitPath.length > 1)
                        for (let i = 0; i < splitPath.length - 1; i++) {
                            current.remotePath = current.remotePath + '/' + splitPath[i];
                        }
                }
                backStack.push(current);
                break;

            case NAVIGATE_FWD:
                // if(ptr < array.length){
                //     ptr--;
                // }
                break;

            case NAVIGATE_BACK:
                // console.log(backStack);
                backStack.moveBack();
                break;
            default:
                break;
        }
        // currentPath = backStack.peek();
        return {
            ...state,
            backStacks: {...state.backStacks, [id]: backStack},
            currentPaths: {...state.currentPaths, [id]: {...backStack.peek()}}
        };
    } else {
        // console.error("ID is unexpectedly null");
        return state;
    }


};
