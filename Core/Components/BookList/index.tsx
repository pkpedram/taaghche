import React, { useEffect, useMemo } from "react";
import { RootState } from "../../Redux/store";
import { connect } from "react-redux";
import { ProductListItem } from "../../Redux/Reducers/reducerTypes";
import BookListItem from "./BookListItem";
import productActions from "../../Redux/Actions/Products";
import BookListItemLoading from "./BookListItemLoading";
import EndlessLastPart from "../EndlessLastPart";

type BookListProps = {
  productList: Array<ProductListItem>,
  generatedParams: {
    order: string | undefined,
  },
  getProductList: Function,
  ordering: string,
  isLoading: boolean,
  clearProductList: Function,
  nextOffset: string,
  loadPreviousData: Function
};

const BookList = ({
  productList,
  generatedParams,
  getProductList,
  ordering,
  isLoading,
  clearProductList,
  nextOffset,
  loadPreviousData,
}: BookListProps) => {

  useEffect(() => {
    if (generatedParams.order) {
      if(generatedParams.order != ordering){
        clearProductList()
      }
      getProductList(
        {},
        {
          filters: `{"list":[{"type":3,"value":164},{"type":21,"value":0},{"type":50,"value":0}]}`,
          ...generatedParams,
        }
      );
      
    }
  }, [generatedParams]);

  
  useEffect(() => {
    if(localStorage.getItem('previousData')){
      loadPreviousData()
    }
  }, [])


  useEffect(() => {
   if(productList.length !== 16){
    let tomorrow = new Date()
      tomorrow.setDate(new Date().getDate() + 1)
    localStorage.setItem('previousData', JSON.stringify( {
      productList: productList,
      ordering: ordering,
      nextOffset: nextOffset,
      expire: tomorrow.toJSON()
    }))
   }else{
    localStorage.removeItem('previousData')
   }
  }, [productList])

  return (
    <div className={`w-full grid sm:grid-cols-1 grid-cols-5 gap-4 mb-8`}>
      {productList?.map((item, idx) => (
        <BookListItem item={item} key={`BOOK_${item.id}__${idx}`} />
      ))}
      {
       isLoading &&
        [...Array(16)].map(item => (
            <BookListItemLoading />
        ))
      }
      {
        !isLoading && <EndlessLastPart /> 
      }
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isMobile: state.publicState.isMobile,
  productList: state.productState.productList,
  generatedParams: state.filterState.generatedParams,
  ordering: state.productState.ordering,
  isLoading: state.publicState.isLoading,
  nextOffset: state.filterState.nextOffset
});
const mapDispatchToProps = {
  getProductList: productActions.getProductList,
  clearProductList: productActions.clearProductList,
  loadPreviousData: productActions.loadPreviousData
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
