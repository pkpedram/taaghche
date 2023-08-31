import { Dispatch } from "redux"
import _dataManager from "../../dataManager"

const productActions = {
    getProductList: (data : object = {}, params: object = {}) => async (dispatch : Dispatch) => {
        await _dataManager.get('everything', data, {dispatch, params: params}, params, false)
    },

}

export default productActions