// rafce
import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNav from '../components/MainNav'
import ScrollToTop from '../utils/ScrollToTop'

const Layout = () => {
    return (
        <div>
            <ScrollToTop />
            <MainNav />

            <main className='h-full px-4 mx-auto'>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout