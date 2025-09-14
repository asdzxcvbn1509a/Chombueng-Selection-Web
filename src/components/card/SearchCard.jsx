//rafce
import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import numeral from 'numeral'
import { ShoppingCart, Search, ChevronDown, Filter } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const SearchCard = () => {

    const carts = useEcomStore((state) => state.carts)

    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters)

    const getcategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)

    const [text, setText] = useState('')
    const [CategorySelected, setCategorySelected] = useState([])
    const [price, setPrice] = useState([0, 1000])
    const [ok, setOK] = useState(false)

    useEffect(() => {
        getcategory()
    }, [])



    // Step 1 Search Text
    //console.log(text)
    useEffect(() => {
        //Code
        const delay = setTimeout(() => {

            if (text) {
                actionSearchFilters({ query: text })
            } else {
                getProduct()
            }
        }, 300)

        return () => clearTimeout(delay)
    }, [text])

    // Step 2 Search Category

    const handleCheck = (e) => {
        const categoryId = e.target.value

        if (categoryId) {
            actionSearchFilters({ category: [categoryId] })
        } else {
            getProduct()
        }
    }


    // Step 3 Search by Price
    useEffect(() => {
        actionSearchFilters({ price })
    }, [ok])
    const handlePrice = (value) => {
        setPrice(value)
        setTimeout(() => {
            setOK(!ok)
        }, 300)
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-center items-center font-semibold font-kanit md:text-7xl text-5xl md:mt-20 mt-10 mb-2 gap-4">
                <h1 className="text-[#585858]">สดใหม่จาก</h1>
                <h1 className="text-[#F3848C]">“จอมบึงซีเล็คชั่น”</h1>
            </div>
            {/* สำหรับหน้าจอ Desktop */}
            <div className='text-center font-kanit md:text-3xl text-[#585858] mb-32 md:flex md:justify-center md:gap-2 hidden md:block'>
                <span className='mx-1'>ปลอดสารเคมี</span>
                <span className='mx-1'>ผลผลิตสะอาดจากชาวบ้าน</span>
                <span className='mx-1'>ส่งตรงถึงมือคุณจากชุมชนท้องถิ่น</span>
            </div>

            {/* สำหรับหน้าจอมือถือ */}
            <div className='text-center font-kanit md:text-3xl text-[#585858] mb-8 md:hidden'>
                <p className='mb-1'>ปลอดสารเคมี ผลผลิตสะอาดจากชาวบ้าน</p>
                <p>ส่งตรงถึงมือคุณจากชุมชนท้องถิ่น</p>
            </div>

            {/* แถวคอนโทรล */}
            <div className="mx-4 md:mx-16 mb-8 md:-mt-6">
                {/* mobile: สองแถว, desktop: แถวเดียว */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-4">

                    {/* แถว 1: ช่องค้นหาเต็มบรรทัด */}
                    <div className="relative md:w-[525px] w-full mr-4">
                        <Search strokeWidth={2} size={32} className=" absolute md:left-6 left-3 top-1/2 -translate-y-1/2 text-[#6E6E6E] scale-75 md:scale-100" />
                        <input
                            className="w-full border-2 border-[#CBCBCB] rounded-md font-kanit font-light text-[#6E6E6E] md:text-3xl md:px-20 py-2 px-14 bg-transparent"
                            placeholder="ค้นหาสินค้า..."
                            type="text"
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    {/* แถว 2: select + cart อยู่บรรทัดเดียวกันบนมือถือ */}
                    <div className="flex items-center gap-1 w-full md:w-auto md:flex-1">
                        {/* select กินพื้นที่ที่เหลือ */}
                        <div className="relative flex-1">
                            <Filter strokeWidth={2} size={32} className="absolute md:left-6 left-3 top-1/2 -translate-y-1/2 text-[#6E6E6E] scale-75 md:scale-100" />
                            <select
                                className="md:w-[525px] w-5/6 border-2 border-[#CBCBCB] rounded-md font-kanit font-light text-[#6E6E6E] md:text-2xl md:pl-20 pl-14 pr-10 py-2 appearance-none bg-transparent "
                                name="categoryId"
                                onChange={handleCheck}
                            >
                                <option value="" className='text-sm md:text-2xl'>หมวดหมู่ทั้งหมด</option>
                                {categories.map((item) => (
                                    <option key={item.id} value={item.id} className='text-sm md:text-2xl'>{item.name}</option>
                                ))}
                            </select>
                            <ChevronDown size={32} strokeWidth={2} className="absolute md:right-[450px] right-16 top-1/2 -translate-y-1/2 pointer-events-none text-[#6E6E6E] scale-75 md:scale-100" />
                        </div>

                        {/* ไอคอนรถเข็น อยู่ขวาสุด แถวเดียวกับ select บนมือถือ */}
                        <NavLink
                            to={'/cart'}>
                            <button
                                type="button"
                                className="relative flex items-center justify-center text-[#6E6E6E] flex-shrink-0  rounded-md border-2 border-transparent hover:text-[#F58D95] hover:scale-105"
                                aria-label="ตะกร้าสินค้า"
                            >
                                <ShoppingCart size={45} strokeWidth={2} className='scale-75 md:scale-100 absolute right-1' />
                                {
                                    carts.length > 0
                                    && (<span className='absolute top-0 right-0 bg-red-500 rounded-full px-2 text-white'>{carts.length}</span>)
                                }
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>

            <hr className=" border-t-2" />
        </div>
    )
}

export default SearchCard