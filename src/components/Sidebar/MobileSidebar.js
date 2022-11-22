import React, { useContext } from 'react'

import SidebarContent from './SidebarContent'
import { Transition, Backdrop } from '@windmill/react-ui'

import { SidebarContext } from '../../context/SidebarContext'
import styled from 'styled-components'

function MobileSidebar() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)

  return (
    <Transition show={isSidebarOpen}>
      <>
        <Transition
          enter="transition ease-in-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Backdrop onClick={closeSidebar} />
        </Transition>

        <Transition
          enter="transition ease-in-out duration-150"
          enterFrom="opacity-0 transform -translate-x-20"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 transform -translate-x-20"
        >
          <Container className="fixed inset-y-0 z-50 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 lg:hidden">
            <SidebarContent />
          </Container>
        </Transition>
      </>
    </Transition>
  )
}
const Container = styled.div`
      z-index: 101;
      top: 0;  left: 0;

      height: 94%;
      max-width:320px;
      width:100%;
      
      margin-top: 0;
     
`  ;
export default MobileSidebar
