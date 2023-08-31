import { AnyAction } from "redux";
import { ProductState } from "../reducerTypes";
import { HYDRATE } from "next-redux-wrapper";

let initialState : ProductState = {
    productInfo: {},
    productList: [],
    relatedProductsList: [],
    ordering: '1',
    firstTimeFetching: false,
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
            if(typeof params?.order === 'string'){
                // ORDERING CHANGES ONLY ON CLIENT SIDE
                
                    return {
                        ...state,
                        productList:  [...state.productList, ...payload.bookList.books],
                        ordering: params?.order === state.ordering ? state.ordering : params?.order
                    }
                
            }else{
                // UPDATES LIST FOR BOTH SERVERSIDE AND CLIENT SIDE
                
                if(typeof payload == 'string'){
                    return {
                        ...state,
                        productList: [...JSON.parse(payload).bookList.books]
                    }
                }else{
                    // alert('hi')
                    return {
                        ...state,
                        productList: [...state.productList, ...payload.bookList.books]
                    }
                }
                
            }
        case 'book/' + params?.id:
            return {
                ...state,
                productInfo: payload.book,
                relatedProductsList: payload.relatedBooks
            }   
            
        // FRONTEND FILTERS
        case 'SORT_PRODUCTS_BY_STARS':
            return {
                ...state,
                productList: [...state.productList.sort((a,b) => b.rating - a.rating)]
            } 

        case 'SORT_PRODUCTS_BY_EXPENSIVE':
            return {
                ...state,
                productList: [...state.productList.sort((a,b) => b.price - a.price)]
                
            }   
        case 'SORT_PRODUCTS_BY_CHEAP':
            return {
                ...state,
                productList: [...state.productList.sort((a,b) => a.price - b.price)]
                
            }   
               
      
        case 'CLEAR_PRODUCT_LIST':
            
                return {
                    ...state,
                    productList: []
                }

          // FIRST LOAD 
          
          case 'LOAD_PREVIOUS_DATA': 
                let data = typeof payload === 'string' ? JSON.parse(payload) : {}
                return {
                    ...state,
                    ordering: data.ordering,
                    productList: data.productList
                }

        default: 
            return state    
    }
}

export default productState