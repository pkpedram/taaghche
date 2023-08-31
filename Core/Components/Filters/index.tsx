import React, { useEffect, useMemo, useState } from 'react'
import Select from '../Select'
import { RootState } from '../../Redux/store'
import { connect } from 'react-redux'
import { filterActions } from '../../Redux/Actions'
import { CustomFilterType } from '../../Redux/Actions/actionTypes'
import { ProductListItem } from '../../Redux/Reducers/reducerTypes'

type filterProps = {
    orderingList: Array<object>,
    generateParams: Function,
    productCustomFilters: Array<CustomFilterType>,
    generateCustomFilters: Function,
    nextOffset: string
}

const Filters = ({orderingList, generateParams, productCustomFilters, generateCustomFilters, nextOffset} : filterProps) => {
  const [savedCustomFilter, setSavedCustomFilter] = useState('')

  useMemo(() => {
    generateCustomFilters({actionType: savedCustomFilter})
  }, [nextOffset])

  return (
    <div className='w-full max-w-[75rem] mx-auto grid grid-cols-3 sm:grid-cols-1 gap-4 mb-4'>
        <Select onChange={(e : React.ChangeEvent<HTMLSelectElement>) => generateParams({order: e.target.value})} title='نحوه اوردرینگ از بک' list={orderingList} keyOfOption='title' valueOfOption='id' />
        <Select onChange={(e : React.ChangeEvent<HTMLSelectElement>) => {
          generateCustomFilters({actionType: e.target.value});
          setSavedCustomFilter(e.target.value)
        }} title='نحوه اوردرینگ از فرانت' list={productCustomFilters} keyOfOption='title' valueOfOption='actionType' />
    </div>
  )
}

const mapStateToProps = (state : RootState) => ({
    orderingList: state.filterState.orderingList,
    productCustomFilters: state.filterState.customFilters.products,
    nextOffset: state.filterState.nextOffset
})
const mapDispatchToProps = {
    generateParams: filterActions.generateParams,
    generateCustomFilters: filterActions.generateCustomFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)