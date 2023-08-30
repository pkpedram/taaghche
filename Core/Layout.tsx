import React, { ReactNode, useEffect } from 'react'
import Header from './Components/Header'
import { RootState } from './Redux/store'
import { connect } from 'react-redux'
import { publicActions } from './Redux/Actions'
import Footer from './Components/Footer'

export interface LayoutType {
    children: ReactNode,
    checkLayoutVersion: Function
}

const Layout  = ({children, checkLayoutVersion} : LayoutType) => {

  useEffect(() => {
    checkLayoutVersion()
  }, [])
  return (
    <div className={`w-full min-h-screen flex  flex-col`}>
      <Header />
        
      <div className='flex-1 mt-40 max-w-[75rem] mx-auto w-full py-10 px-4'>
        {children}
      </div>

      <Footer />
    </div>
  )
}

const mapStateToProps = (state : RootState) => ({

})
const mapDispatchToProps = {
  checkLayoutVersion: publicActions.checkLayoutVersion
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)