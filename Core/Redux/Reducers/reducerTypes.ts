type customFilter = {
    id: number,
    title: string,
    actionType: string
}

export interface FilterState {
    generatedParams: Object,
    hasMore: boolean,
    nextOffset: string,
    orderingList: Array<object>,
    customFilters: {
        products: Array<customFilter>
    }
}

export interface PublicState {
    isMobile: boolean
}

type authors = {
    id: number,
    firstName: string,
    lastName: string,
    type: number
}

type files = {
    id: number,
    size: number,
    type: number,
    bookId: number,
    sequenceNo: number
}

type categories = {
    id: number,
    parent: number,
    title: string,
    slug: string
}

type rates = {
    value: number,
    count: number
}

export type ProductListItem = {
    id: number,
    title: string,
    sourceBookId: number,
    hasPhysicalEdition: boolean,
    canonicalId: number,
    subtitle: string,
    description: string,
    htmlDescription: string,
    PublisherID: number,
    publisherSlug: string,
    price: number,
    numberOfPages: number,
    rating: number,
    rates: Array<rates>,
    rateDetails: Array<object>,
    types: Array<object>,
    sticker: string,
    beforeOffPrice: number,
    offText: string,
    priceColor: string,
    isRtl: boolean,
    showOverlay: boolean,
    PhysicalPrice: number,
    physicalBeforeOffPrice: number,
    ISBN: string,
    publishDate: string,
    destination: number,
    type: string,
    coverUri: string,
    shareUri: string,
    shareText: string,
    publisher: string,
    authors: Array<authors>,
    files: Array<files>,
    labels: Array<object>,
    categories: Array<categories>,
    subscriptionAvailable: boolean,
    state: number,
    encrypted: boolean,
    currencyPrice: number,
    currencyBeforeOffPrice: number
}


export type ProductInfo =  {

}

export interface ProductState {
    productList: Array<ProductListItem>,
    productInfo: ProductInfo,
    relatedProductsList: Array<ProductListItem>,
    ordering: string
}