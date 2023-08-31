import { AnyAction } from "redux";
import { PublicState } from "../reducerTypes";

let initialState : PublicState = {
    isMobile: false,
    isLoading: false,
}

const publicState = (state: PublicState = initialState, action: AnyAction) => {
    let {type, payload} = action

    switch(type){
        case 'SET_MOBILE':
            return {
                ...state,
                isMobile: payload
            }
        case 'LOADING_START':
            return {
                ...state,
                isLoading: true
            } 
        case 'LOADING_END':
            return {
                ...state,
                isLoading: false
            }
            
            
        default:
            return state
    }
}

export default publicState