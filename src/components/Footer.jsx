// rafce
import React from 'react'
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            {/* <div className='bg-[#FFBEE6] pt-6 font-sarabun pb-6 hidden md:block mt-24'>
                <div className='flex justify-center gap-8 text-white'>
                    <Link to={'https://www.facebook.com/profile.php?id=61568143563912'} target='_blank'>
                        <Facebook size={48} />
                    </Link>
                    <Link>
                        <Instagram size={48} />
                    </Link>
                    <Link>
                        <Twitter size={48} />
                    </Link>
                </div>
                <hr className='border-t-2 mx-auto border-white my-4 md:w-[900px] w-[300px]' />
                <div className='flex justify-center gap-16 text-2xl text-white'>
                    <NavLink to={'/'}>หน้าแรก</NavLink>
                    <NavLink to={'/shop'}>สินค้า</NavLink>
                    <NavLink to={'/community'}>ชุมชุนของเรา</NavLink>
                </div>
            </div>

            <div className='bg-[#FFBEE6] pt-3 font-sarabun pb-3 md:hidden'>
                <div className='flex justify-center gap-4 text-white'>
                    <Link to={'https://www.facebook.com/profile.php?id=61568143563912'} target='_blank'>
                        <Facebook size={32} />
                    </Link>
                    <Link>
                        <Instagram size={32} />
                    </Link>
                    <Link>
                        <Twitter size={32} />
                    </Link>
                </div>
                <hr className='border-t-2 mx-auto border-white my-2 md:w-[900px] w-[300px]' />
                <div className='flex justify-center gap-8 text-xl text-white'>
                    <NavLink to={'/'}>หน้าแรก</NavLink>
                    <NavLink to={'/shop'}>สินค้า</NavLink>
                    <NavLink to={'/community'}>ชุมชุนของเรา</NavLink>
                </div>
            </div> */}
            {/* <div className='bg-[#CFB696] text-center font-kanit md:text-3xl text-lg text-white py-4 font-medium'>
                <p>ติดต่อเรา : 090-000-0000</p>
            </div> */}
        </div>
    )
}

export default Footer