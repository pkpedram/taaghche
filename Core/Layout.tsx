import React, { ReactNode } from 'react'

export interface LayoutType {
    children: ReactNode
}

const Layout  = ({children} : LayoutType) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default Layout