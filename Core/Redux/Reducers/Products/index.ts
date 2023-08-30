import { AnyAction } from "redux";
import { ProductState } from "../reducerTypes";
import { HYDRATE } from "next-redux-wrapper";

let initialState : ProductState = {
    productInfo: {},
    productList: [],
    relatedProductsList: [],
}

const productState = (state : ProductState  = initialState, action : AnyAction) => {
    let {type, payload, params} = action

    switch(type){

        // HYDRATING SERVERSIDE STATE TO CLIENT SIDE STATE
        case HYDRATE: 
        return {
            ...state,
            ...payload.productState
        }

        // NORMAL DISPATCH

        case 'everything':
            return {
                ...state,
                productList: JSON.parse(payload).bookList.books
            }
        case 'book/' + params?.id:
            return {
                ...state,
                productInfo: payload.book,
                relatedProductsList: payload.relatedBooks
            }     
        default: 
            return state    
    }
}

export default productState