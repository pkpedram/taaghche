import { Dispatch } from "redux"
import _dataManager from "../../dataManager"

const productActions = {
    getProductList: (data : object = {}, params: object = {}) => async (dispatch : Dispatch) => {
        await _dataManager.get('everything', data, {dispatch, params: params}, params, false)
    },
    clearProductList: () => (dispatch : Dispatch) => {
        dispatch({type: 'CLEAR_PRODUCT_LIST'})
    }

}

export default productActions