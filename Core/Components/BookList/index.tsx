import React from 'react'
import { RootState } from '../../Redux/store'
import { connect } from 'react-redux'
import { ProductListItem } from '../../Redux/Reducers/reducerTypes'
import BookListItem from './BookListItem'

type BookListProps = {
    isMobile: boolean,
    productList: Array<ProductListItem>,

}

const BookList = ({isMobile, productList} : BookListProps) => {
  return (
    <div className={`w-full grid sm:grid-cols-1 grid-cols-5 gap-4`}>
        {
            productList?.map((item) => (
                <BookListItem item={item} key={`BOOK_${item.id}`} />
            ))
        }
    </div>
  )
}

const mapStateToProps = (state : RootState) => ({
    isMobile: state.publicState.isMobile,
    productList: state.productState.productList
})
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(BookList)