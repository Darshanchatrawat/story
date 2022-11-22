import React from 'react'


import SidebarContent from './SidebarContent'

function DesktopSidebar(props) {
  return (

    <aside className="z-30 flex-shrink-0 hidden overflow-y-auto bg-white dark:bg-gray-800 lg:block fixed top-0 left-0" style={{ maxWidth: "360px", width: "100%", height: "100vh" }}>
      <SidebarContent />

    </aside>
  )
}


export default DesktopSidebar
