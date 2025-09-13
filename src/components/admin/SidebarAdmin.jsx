//rafce
import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard } from 'lucide-react';
import { ChartNoAxesGantt } from 'lucide-react';
import { ChartBarStacked } from 'lucide-react';
import { Barcode } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { ListOrdered } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';

const SidebarAdmin = () => {

    const logout = useEcomStore((state) => state.logout)

    return (
        <div className='bg-gray-800 w-64 text-gray-100 flex flex-col h-screen'>
            <div className='h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold'>
                แอดมินเพจ
            </div>
            <nav className='flex-1 px-4 py-4 space-y-2'>
                <NavLink to={'/admin'} end className={({ isActive }) =>
                    isActive
                        ? 'bg-gray-900 text-white px-4 py-2 flex items-center rounded-md'
                        : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
                } >
                    <LayoutDashboard className='mr-2' />
                    ข้อมูลสรุป
                </NavLink>

                <NavLink to={'manage'} className={({ isActive }) =>
                    isActive
                        ? 'bg-gray-900 text-white px-4 py-2 flex items-center rounded-md'
                        : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
                } >
                    <ChartNoAxesGantt className='mr-2' />
                    การจัดการ
                </NavLink>

                <NavLink to={'category'} className={({ isActive }) =>
                    isActive
                        ? 'bg-gray-900 text-white px-4 py-2 flex items-center rounded-md'
                        : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
                } >
                    <ChartBarStacked className='mr-2' />
                    หมวดหมู่
                </NavLink>

                <NavLink to={'product'} className={({ isActive }) =>
                    isActive
                        ? 'bg-gray-900 text-white px-4 py-2 flex items-center rounded-md'
                        : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
                } >
                    <Barcode className='mr-2' />
                    สินค้า
                </NavLink>
                <NavLink to={'orders'} className={({ isActive }) =>
                    isActive
                        ? 'bg-gray-900 text-white px-4 py-2 flex items-center rounded-md'
                        : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
                }>
                    {/* ใส่ icon ตามใจ เช่น Barcode หรือ List */}
                    <ListOrdered className='mr-2'/>
                    รายการสั่งซื้อ
                </NavLink>

            </nav>
            <footer>
                <NavLink
                    to={'/'}
                    onClick={logout}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-gray-900 text-white px-4 py-2 flex items-center rounded-md'
                            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
                    } >
                    <LogOut className='mr-2' />
                    ออกจากระบบ
                </NavLink>
            </footer>
        </div>
    )
}

export default SidebarAdmin