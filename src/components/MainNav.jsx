// rafce
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useEcomStore from '../store/ecom-store'
import { ChevronDown, Menu, X, UserRound } from 'lucide-react'
import { color } from 'framer-motion';

const MainNav = () => {
    // Javascript
    const carts = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)
    const logout = useEcomStore((state) => state.logout)
    const [isOpen, setIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);


    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const toggleMenu = () => setMenuOpen(!menuOpen)


    return (
        <nav className='sticky top-0 z-50 bg-[#F9F6F3] md:py-4 px-6 font-kanit'
            style={{ boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px' }}>
            <div className='mx-auto md:px-20 px-6'>
                <div className='flex justify-between h-16 items-center'>
                    <div>
                        <NavLink to={'/'} className='text-2xl'>
                            <img
                                className='md:w-16 w-12 p-1 md:ml-10 rounded-xl'
                                src='https://res.cloudinary.com/dtcif0lxf/image/upload/v1757063775/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD_18_xvqbfc.png' />
                        </NavLink>
                    </div>

                    <div className='hidden md:flex items-center gap-44'>

                        <NavLink
                            style={({ isActive }) => ({
                                color: isActive
                                    ? '#F499A0'
                                    : '#6E6E6E',
                            })}
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-3 py-2 font-semibold text-2xl'
                                    : 'px-3 py-2 font-semibold text-2xl'
                            }
                            to={'/'}>
                            หน้าแรก
                        </NavLink>

                        <NavLink
                            style={({ isActive }) => ({
                                color: isActive
                                    ? '#F499A0'
                                    : '#6E6E6E',
                            })}
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-3 py-2 font-semibold text-2xl'
                                    : 'px-3 py-2 font-semibold text-2xl'
                            }
                            to={'/shop'}>
                            สินค้า
                        </NavLink>

                        <NavLink
                            style={({ isActive }) => ({
                                color: isActive
                                    ? '#F499A0'
                                    : '#6E6E6E',
                            })}
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-3 py-2 font-semibold text-2xl'
                                    : 'px-3 py-2 font-semibold text-2xl'
                            }
                            to={'/community'}>
                            ชุมชนของเรา
                        </NavLink>
                        {/* Badge */}
                        {/* <Link
                            className='relative py-4'
                            to={'/cart'}>
                            ตะกร้า
                            {
                                carts.length > 0
                                && (<span className='absolute top-2 bg-red-500 rounded-full px-2'>{carts.length}</span>)
                            }
                        </Link> */}
                    </div>

                    <div className='hidden md:flex items-center gap-2'>
                        {
                            user
                                ? <div className='relative mr-10 dropdown-user'>
                                    <button
                                        onClick={toggleDropdown}
                                        className='flex items-center hover:text-[#F499A0] border-4 rounded-full p-2 border-[#6E6E6E] hover:border-[#F499A0]'>
                                        <UserRound
                                            size={24}
                                            strokeWidth={4}
                                            className='text-[#6E6E6E] hover:text-[#F499A0]'
                                        />
                                    </button>

                                    {isOpen && (
                                        <div className='absolute right-0 top-full mt-2 bg-white shadow-md border rounded-md z-50 min-w-[160px]'>
                                            <button
                                                onClick={logout}
                                                className='block w-full text-center hover:bg-gray-100 py-2 px-4 text-[#3E3E3E] font-kanit'>
                                                ออกจากระบบ
                                            </button>
                                        </div>
                                    )}
                                </div>

                                : <div className='flex items-center gap-1'>
                                    {/* <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'px-3 py-2 rounded-md font-medium'
                                            : 'px-3 py-2 rounded-md font-medium'
                                    }
                                    to={'/register'}>
                                    สมัครสมาชิก
                                </NavLink> */}
                                    <NavLink
                                        style={({ isActive }) => ({
                                            color: isActive
                                                ? 'white'
                                                : 'white'
                                        })}
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'px-8 py-2 text-xl bg-[#F499A0] rounded-lg'
                                                : 'px-8 py-2 text-xl bg-[#F499A0]/80 rounded-lg'
                                        }
                                        to={'/login'}>
                                        เข้าสู่ระบบ
                                    </NavLink>
                                </div>
                        }
                    </div>

                    {/* Hamburger ปุ่ม สำหรับมือถือ */}
                    <div className='md:hidden'>
                        <button
                            onClick={toggleMenu}
                            className='text-[#3E3E3E] hover:text-[#FF65C3]'>
                            {menuOpen ? <X size={32} /> : <Menu size={38} />}
                        </button>
                    </div>
                </div>
                {/* เมนูดรอปดาวน์สำหรับมือถือ */}
                {menuOpen && (
                    <div className={`fixed right-0 h-screen w-3/5 max-w-sm bg-white z-50 shadow-2xl border-l transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col gap-4`}
                        role="dialog" aria-modal="true">
                        <NavLink
                            to="/"
                            className="text-lg hover:text-[#FF65C3] font-kanit text-[#6E6E6E] pl-8 pt-4"
                            onClick={toggleMenu}
                        >
                            หน้าแรก
                        </NavLink>
                        <hr className='border-t-2'/>
                        <NavLink
                            to="/shop"
                            className="text-lg hover:text-[#FF65C3] font-kanit text-[#6E6E6E] pl-8"
                            onClick={toggleMenu}
                        >
                            สินค้า
                        </NavLink>
                        <hr className='border-t-2'/>
                        <NavLink
                            to="/community"
                            className="text-lg hover:text-[#FF65C3] font-kanit text-[#6E6E6E] pl-8"
                            onClick={toggleMenu}
                        >
                            ชุมชนของเรา
                        </NavLink>
                        <hr className='border-t-2'/>
                        {user ? (
                            <button
                                onClick={() => { logout(); toggleMenu(); }}
                                className="text-lg hover:text-[#FF65C3] font-kanit text-white text-center bg-[#F499A0] mx-16 rounded-md"
                            >
                                ออกจากระบบ
                            </button>
                        ) : (
                            <NavLink
                                to="/login"
                                className="text-lg hover:text-[#FF65C3] font-kanit text-white text-center bg-[#F499A0] mx-16 rounded-md"
                                onClick={toggleMenu}
                            >
                                เข้าสู่ระบบ
                            </NavLink>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )
}

export default MainNav