import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import Footer from './Footer'
import MobileSidebar from './MobileSidebar'


function Sidebar() {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
      <Footer />
    </>
  )
}

export default Sidebar
