import { AnyAction } from "redux";
import { ProductListItem, ProductState, Publisher } from "../reducerTypes";
import { HYDRATE } from "next-redux-wrapper";

let initialState: ProductState = {
  productInfo: {},
  productList: [],
  relatedProductsList: [],
  filteredProducts: [],
  ordering: "1",
  firstTimeFetching: false,
  publisherList: [],
};

const productState = (
  state: ProductState = initialState,
  action: AnyAction
) => {
  let { type, payload, params } = action;

  switch (type) {
    // HYDRATING SERVERSIDE STATE TO CLIENT SIDE STATE
    case HYDRATE:
      return {
        ...state,
        ...payload.productState,
      };



    // NORMAL DISPATCH

    case "CLEAR_PRODUCT_LIST":
      return {
        ...state,
        productList: [],
        filteredProducts: [],
      };


    // API CALL  

    // get list
    case "everything":
      if (typeof params?.order === "string") {

        // this is for filtering from backend

        let newPublisherList : Array<Publisher> = [];
        payload.bookList.books.map((item: ProductListItem) => {
          if (!newPublisherList.find((itm) => itm.id == item.PublisherID)) {
            newPublisherList.push({
              id: item.PublisherID,
              title: item.publisher,
            });
          }
        });

        return {
          ...state,
          productList: [...state.productList, ...payload.bookList.books],
          filteredProducts: [...state.productList, ...payload.bookList.books],
          ordering:
            params?.order === state.ordering ? state.ordering : params?.order,
          publisherList: newPublisherList,
        };
      } else {
        // this is for all other cases that we call the api

        if (typeof payload == "string") {

            // this means it is loading from localStorage or it's a getServerSideProps
            
          let newpublist = state.publisherList;
          JSON.parse(payload).bookList.books.map((item: ProductListItem) => {
            if (!newpublist.find((itm) => itm.id == item.PublisherID)) {
              newpublist.push({
                id: item.PublisherID,
                title: item.publisher,
              });
            }
          });
          return {
            ...state,
            productList: [...JSON.parse(payload).bookList.books],
            filteredProducts: [...JSON.parse(payload).bookList.books],
            publisherList: newpublist,
          };
        } else {
          return {
            ...state,
            productList: [...state.productList, ...payload.bookList.books],
          };
        }
      }

    case "book/" + params?.id:
      return {
        ...state,
        productInfo: payload.book,
        relatedProductsList: payload.relatedBooks,
      };

    // FRONTEND FILTERS
    
    case "SORT_PRODUCTS_BY_STARS":
      return {
        ...state,
        filteredProducts: [
          ...state.filteredProducts
            .filter((itm) => itm.rating)
            .sort((a, b) => b.rating - a.rating),
        ],
      };
    case "SORT_PRODUCTS_BY_EXPENSIVE":
      return {
        ...state,
        filteredProducts: [
          ...state.filteredProducts.sort((a, b) => b.price - a.price),
        ],
      };
    case "SORT_PRODUCTS_BY_CHEAP":
      return {
        ...state,
        filteredProducts: [
          ...state.filteredProducts.sort((a, b) => a.price - b.price),
        ],
      };
    case "SET_PUBLISHER_FILTER":
       let newPublisherFilteredData = state.productList.filter((item) =>
        payload.map((itm: Publisher) => itm.id).includes(item.PublisherID))
      return {
        ...state,
        filteredProducts: payload.length !== 0 ? newPublisherFilteredData : [...state.productList]
      };



    // CACHE LOAD

    case "LOAD_PREVIOUS_DATA":
      let data = typeof payload === "string" ? JSON.parse(payload) : {};
      let newPublisherList = state.publisherList;
        data.productList.map((item: ProductListItem) => {
          if (!newPublisherList.find((itm) => itm.id == item.PublisherID)) {
            newPublisherList.push({
              id: item.PublisherID,
              title: item.publisher,
            });
          }
        });
      return {
        ...state,
        ordering: data.ordering,
        productList: data.productList,
        filteredProducts: data.productList,
        publisherList: newPublisherList
      };

    default:
      return state;
  }
};

export default productState;
