import { Dispatch } from "redux";

const filterActions = {
  generateParams: (data: object) => async (dispatch: Dispatch) =>
    dispatch({ type: "GENERATE_PARAMS", payload: data }),
};

export default filterActions;
