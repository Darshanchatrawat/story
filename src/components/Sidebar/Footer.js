import React from 'react'
import { SidebarContext } from "../../context/SidebarContext"
import styled from 'styled-components'
import { useContext } from 'react'



function Footer() {
    const { toggleSidebar } = useContext(SidebarContext)
    return (
        <Container className=' flex fixed  items-end bottom-0 w-full '>
            <div className=" flex w-full  justify-around items-center border-2 bg-white h-16 shadow-lg">
                <div className='hover:bg-blue-50 h-full text-center pt-5 bg-white w-full ' onClick={toggleSidebar}>X</div>
                <div className='hover:bg-blue-50 h-full text-center pt-5 bg-white w-full ' onClick={toggleSidebar} >D</div>
                <div className='hover:bg-blue-50 h-full text-center pt-5 bg-white w-full '>A</div>
            </div>
        </Container>
    )
}
const Container = styled.div`
    display:none;
    @media (max-width:1024px){
        display:flex;
        z-index:101;

    }
`;
export default Footer
