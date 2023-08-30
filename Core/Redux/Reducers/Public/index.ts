import { AnyAction } from "redux";
import { PublicState } from "../reducerTypes";

let initialState : PublicState = {
    isMobile: false,
}

const publicState = (state: PublicState = initialState, action: AnyAction) => {
    let {type, payload} = action

    switch(type){
        case 'SET_MOBILE':
            return {
                ...state,
                isMobile: payload
            }

        default:
            return state
    }
}

export default publicState