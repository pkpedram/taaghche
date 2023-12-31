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
    isMobile: boolean,
    isLoading: boolean
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

export type categories = {
    id: number,
    parent: number,
    title: string,
    slug: string
}

type rates = {
    value: number,
    count: number
}

export type bookTypes = {
    id: number,
    name: string,
    price: number,
    beforeOffPrice: number
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
    types: Array<bookTypes>,
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
    currencyBeforeOffPrice: number,
}


export type ProductInfo  =  {
    
    id: number,
    sourceBookId: number,
    title: string;
    hasPhysicalEdition: boolean;
    canonicalId: number;
    description: string;
    htmlDescription: string;
    faqs: string,
    PublisherID: number,
    publisherSlug: string;
    price: number;
    numberOfPages: number,
    rating: number;
    rates: Array<rates>;
    rateDetails: Array<object>;
    types: Array<object>;
    sticker: string;

}

export type Publisher = {
    id: number | string,
    title: string
}
export interface ProductState {
    productList: Array<ProductListItem>,
    productInfo: ProductListItem,
    relatedProductsList: Array<ProductListItem>,
    ordering: string,
    firstTimeFetching: boolean,
    filteredProducts: Array<ProductListItem>,
    publisherList: Array<Publisher>
}