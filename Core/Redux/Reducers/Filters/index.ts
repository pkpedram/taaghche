import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { FilterState } from "../reducerTypes";

export type FilteringData = {
  hasMore: boolean,
  nextOffset: string,
  orderingList: string
}

const initialState: FilterState = {
    generatedParams: {

    },
    hasMore: false,
    nextOffset: '',
    orderingList: []
};

const filterState = (state : FilterState = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {

    case HYDRATE: 
    return {
        ...state,
        ...payload.filterState
    }

    case 'SET_FILTERING_DATA': 
    let data : FilteringData = JSON.parse(payload)
    return {
      ...state,
      hasMore: data.hasMore,
      nextOffset: data.nextOffset,
      orderingList: JSON.parse(data.orderingList)
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