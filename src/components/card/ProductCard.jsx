// rafce
import React from 'react'
import { ShoppingCart } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import numeral from 'numeral';
import { motion } from "motion/react"

const ProductCard = ({ item }) => {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart)

  // เช็คว่าเป็นสินค้าประจำสัปดาห์จากชื่อ category
  const isWeeklyProduct = item.category?.name === "สินค้าประจำสัปดาห์"
  const isOutOfStock = item.status === false

  return (
    <div className='border rounded-xl md:w-[325px] w-full bg-[#ECECEC] md:mb-10 mb-4 overflow-visible'>
      <div className='flex items-center justify-center relative'>
        {
          item.images && item.images.length > 0
            ? <img className='w-full md:h-[225px] h-[150px] overflow-hidden bg-[#D9D9D9] object-cover rounded-t-xl' src={item.images[0].url} />
            : <div className='w-full md:h-[225px] h-[150px] overflow-hidden bg-[#D9D9D9] text-center align-middle flex items-center justify-center rounded-t-xl font-kanit text-xl'>
              ไม่มีรูปภาพ
            </div>
        }
        {
          isWeeklyProduct && (
            <img
              src={'https://res.cloudinary.com/dtcif0lxf/image/upload/v1757492641/%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88-%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B3%E0%B8%AA%E0%B8%B1%E0%B8%9B%E0%B8%94%E0%B8%B2%E0%B8%AB%E0%B9%8C_x4lv21.png'}
              alt="สินค้าประจำสัปดาห์"
              className='absolute top-4 right-4 object-contain transform -translate-y-4 translate-x-4'>
            </img>
          )
        }
        {
          isOutOfStock && (
            <img
              src={'https://res.cloudinary.com/dtcif0lxf/image/upload/v1757603413/%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%AB%E0%B8%A1%E0%B8%94_i3ftmx.png'}
              className='absolute md:h-[225px] h-[150px]'
              />
          )
        }
      </div>
      <div className='md:p-4 p-3'>
        <div>
          <p className='md:text-2xl text-lg font-semibold font-sarabun truncate text-[#3E3E3E]'>{item.title}</p>
          <p className='text-lg font-sarabun text-[#6E6E6E] truncate md:mt-2'>{item.description}</p>
        </div>
        <div className='mt-6'>
          <span className='text-3xl text-[#F3878F] font-bold'>
            {numeral(item.price).format('0,0')}.-
          </span>
          <br />
          <button
            onClick={() => actionAddtoCart(item)}
            className=' bg-[#9FC69F] mt-2 py-1 rounded-md hover:scale-105 text-white w-full flex justify-center gap-2 font-kanit font-light md:text-xl text-lg'>
            <ShoppingCart />
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard