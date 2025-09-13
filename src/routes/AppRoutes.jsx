// rafce
import React from 'react'
import { createBrowserRouter, RouterProvider, createHashRouter } from 'react-router-dom'

// Pages
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Line from '../pages/auth/Line'
// Layouts
import Layout from '../layouts/Layout'
import LayoutAdmin from '../layouts/LayoutAdmin'
import LayoutUser from '../layouts/LayoutUser'

// Admin Pages
import Dashboard from '../pages/admin/Dashboard'
import Category from '../pages/admin/Category'
import Product from '../pages/admin/Product'
import EditProduct from '../pages/admin/EditProduct'
import Manage from '../pages/admin/Manage'
import Order from '../pages/admin/Order'

// User Pages
import HomeUser from '../pages/user/HomeUser'

// Protected Routes
import ProtectRouteUser from './ProtectRouteUser'
import ProtectRouteAdmin from './ProtectRouteAdmin'
import Community from '../pages/Community'

const router = createBrowserRouter([   // ✅ แก้ตรงนี้
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'shop', element: <Shop /> },
            { path: 'community', element: <Community /> },
            { path: 'cart', element: <Cart /> },
            { path: 'checkout', element: <Checkout /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'line', element: <Line /> },
        ]
    },
    {
        path: '/admin',
        element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'category', element: <Category /> },
            { path: 'product', element: <Product /> },
            { path: 'product/:id', element: <EditProduct /> },
            { path: 'manage', element: <Manage /> },
            { path: 'orders', element: <Order /> },
        ]
    },
    {
        path: '/user',
        element: <ProtectRouteUser element={<LayoutUser />} />,
        children: [
            { index: true, element: <HomeUser /> },
        ]
    }
])

const AppRoutes = () => {
    return <RouterProvider router={router} />
}

export default AppRoutes