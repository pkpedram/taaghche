export interface FilterState {
    generatedParams: Object,
    hasMore: boolean,
    nextOffset: string,
    orderingList: Array<object>
}

export interface PublicState {
    isMobile: boolean
}

export type ProductListItem = {

}
export type ProductInfo =  {

}

export interface ProductState {
    productList: Array<ProductListItem>,
    productInfo: ProductInfo,
    relatedProductsList: Array<ProductListItem>
}