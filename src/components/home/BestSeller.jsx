// rafce
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { productBy, searchFilters } from '../../api/product'
import ProductCard from '../card/ProductCard'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import useEcomStore from '../../store/ecom-store';
import { ChevronLeft, ChevronRight } from "lucide-react";

const BestSeller = () => {
    const categories = useEcomStore((state) => state.categories)
    const getCategory = useEcomStore((state) => state.getCategory)
    const [data, setData] = useState([])
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    // โหลดหมวดหมู่ครั้งแรก ถ้ายังไม่มี
    useEffect(() => {
        if (!categories || categories.length === 0) {
            getCategory()
        }
    }, [categories, getCategory])

    // ทำให้ loadData มองเห็น categories ปัจจุบันเสมอ
    const loadData = useCallback(async () => {
        try {
            // หา id ของหมวด "สินค้าประจำสัปดาห์"
            const weekly = categories?.find(c => c.name === 'สินค้าประจำสัปดาห์')

            if (weekly) {
                const res = await searchFilters({ category: [weekly.id] })
                setData(res.data || [])
            } else {
                // ยังไม่มี category หรือไม่มีชื่อดังกล่าว → fallback
                const res = await productBy('price', 'desc', 100)
                setData(res.data || [])
            }
        } catch (err) {
            console.error('loadData error:', err)
            setData([])
        }
    }, [categories])

    // เรียก loadData เมื่อ categories ถูกโหลดมาแล้ว
    useEffect(() => {
        if (categories && categories.length > 0) {
            loadData()
        }
    }, [categories, loadData])

    return (
        <div className='relative w-full max-w-[1400px] mx-auto bg-[#FDFDFD]'>
            <button
                ref={prevRef}
                className='absolute left-2 -top-24 -translate-y-1/2 z-20 bg-[#6F8D6B] text-[#FBFBFB] md:hover:scale-105 [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:cursor-not-allowed md:scale-100 scale-50 md:mt-0 mt-4'
                aria-label='previous'>
                <ChevronLeft size={64} strokeWidth={2} />
            </button>
            <button
                ref={nextRef}
                className='absolute right-2 -top-24 -translate-y-1/2 z-20 bg-[#6F8D6B] text-[#FBFBFB] md:hover:scale-105 [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:cursor-not-allowed md:scale-100 scale-50 md:mt-0 mt-4'
                aria-label='next'>
                <ChevronRight size={64} strokeWidth={2} />
            </button>
            <Swiper
                slidesPerGroup={2}
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true }}
                breakpoints={{
                    0: { slidesPerView: 2, spaceBetween: 0, slidesPerGrou: 2 },
                    768: { slidesPerView: 4, spaceBetween: 32, slidesPerGroup: 4 },
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                }}
                navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                className='mySwiper md:mt-14 mt-6'>
                {data?.map((item, index) => (
                    <SwiperSlide
                        key={index} className='flex justify-center'>
                        <div className='w-full max-w-[260px] scale-95 md:scale-100'>
                            <ProductCard item={item} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default BestSeller