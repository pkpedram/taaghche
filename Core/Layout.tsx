import React, { ReactNode, useEffect } from 'react'
import Header from './Components/Header'
import { RootState } from './Redux/store'
import { connect } from 'react-redux'
import { publicActions } from './Redux/Actions'

export interface LayoutType {
    children: ReactNode,
    checkLayoutVersion: Function
}

const Layout  = ({children, checkLayoutVersion} : LayoutType) => {

  useEffect(() => {
    checkLayoutVersion()
  }, [])
  return (
    <div className={`w-full min-h-screen`}>
      <Header />
        {children}
    </div>
  )
}

const mapStateToProps = (state : RootState) => ({

})
const mapDispatchToProps = {
  checkLayoutVersion: publicActions.checkLayoutVersion
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)