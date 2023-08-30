import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { FilterState } from "../reducerTypes";



const initialState: FilterState = {
    generatedParams: {

    },
};

const filterState = (state : FilterState = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {

    case HYDRATE: 
    return {
        ...state,
        ...payload.filterState
    }

  case 'GENERATE_PARAMS': 
    return {
        ...state,
        generatedParams: {
            ...state.generatedParams,
            ...payload
        }
    }


    default:
      return state;
  }
}


export default filterState