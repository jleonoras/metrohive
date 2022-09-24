import React from 'react'
import { Outlet } from 'react-router-dom'
import StyledNavbar from '../component/Navbar'

const Home = () => {
    return (
        <>
            <StyledNavbar />
            <Outlet />
        </>
    )
}

export default Home