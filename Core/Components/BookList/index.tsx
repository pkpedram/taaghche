import React, { useEffect } from "react";
import { RootState } from "../../Redux/store";
import { connect } from "react-redux";
import { ProductListItem } from "../../Redux/Reducers/reducerTypes";
import BookListItem from "./BookListItem";
import productActions from "../../Redux/Actions/Products";
import BookListItemLoading from "./BookListItemLoading";

type BookListProps = {
  isMobile: boolean,
  productList: Array<ProductListItem>,
  generatedParams: {
    order: string | undefined,
  },
  getProductList: Function,
  ordering: string,
  isLoading: boolean
};

const BookList = ({
  isMobile,
  productList,
  generatedParams,
  getProductList,
  ordering,
  isLoading
}: BookListProps) => {
  useEffect(() => {
    if (generatedParams.order) {
      getProductList(
        {},
        {
          filters: `{"list":[{"type":3,"value":164},{"type":21,"value":0},{"type":50,"value":0}]}`,
          ...generatedParams,
        }
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [generatedParams]);

  return (
    <div className={`w-full grid sm:grid-cols-1 grid-cols-5 gap-4`}>
      {productList?.map((item) => (
        <BookListItem item={item} key={`BOOK_${item.id}`} />
      ))}
      {
       isLoading && [...Array(16)].map(item => (
            <BookListItemLoading />
        ))
      }
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isMobile: state.publicState.isMobile,
  productList: state.productState.productList,
  generatedParams: state.filterState.generatedParams,
  ordering: state.productState.ordering,
  isLoading: state.publicState.isLoading
});
const mapDispatchToProps = {
  getProductList: productActions.getProductList,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
