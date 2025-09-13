// rafce
import React, { useState } from 'react'
import { ShoppingCart, MoveRight, Truck, Shield, Heart } from 'lucide-react'
import BestSeller from '../components/home/BestSeller'
import ClockHourly from '../utils/Date'
import Slider from '../components/home/Slider'
import { Link, NavLink } from 'react-router-dom'
import Footer from '../components/Footer'
// import { motion } from 'framer-motion' // ใช้เมื่ออยากทำแอนิเมชันจริง

const Home = () => {
  const [isHover, setIsHover] = useState(false) // ถ้าจะใช้ hover ผ่าน state

  return (
    <div>
      <div>
        <section className="relative items-center md:justify-center bg-cover bg-center w-full md:h-[600px] h-[575px] md:pt-0 pt-32 bg-[#BFBFBF] hidden md:block"
          style={{ backgroundImage: 'url("https://res.cloudinary.com/dtcif0lxf/image/upload/v1757347595/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD_22_pxe8hh.png")' }}>
          {/* <div className='absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-pink-300/60 to-transparent'>

          </div>
          <div className="relative z-10 px-0 text-center text-white ">
            <div className='drop-shadow-[2px_2px_6px_rgba(255,105,180,0.8)]'>
              <h1 className="font-kanit text-4xl md:text-9xl font-semibold leading-tight mb-4 md:mt-10">
                จอมบึงซีเลคชั่น
              </h1>
              <h1 className='font-kanit text-4xl md:text-9xl font-semibold leading-tight'>
                เราคัดสรรมาเพื่อคุณ
              </h1>
              <p className="md:mt-10 mt-4 text-2xl md:text-5xl text-white/90  font-normal font-kanit">
                ปลอดสารเคมี ผลผลิตสะอาดจากชาวบ้าน
              </p>
              <p className='md:mt-4 mt-0 text-2xl md:text-5xl text-white/90 font-normal font-kanit'>
                ส่งตรงถึงมือคุณจากชุมชนท้องถิ่น
              </p>
            </div>
            <div className="mt-10  flex flex-wrap justify-center md:gap-14 gap-10 font-kanit">
              <NavLink
                to={'/shop'}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                  backgroundColor: isHover
                    ? 'rgba(255, 151, 208, 0.8)'
                    : 'rgba(232, 196, 218, 0.8)',
                }}
                className="text-white md:py-4 md:px-8 px-4 py-2 rounded-lg md:text-4xl text-2xl font-normal flex items-center gap-4">
                <ShoppingCart size={32} /> เลือกชมสินค้า
              </NavLink>

              <NavLink to={'/community'}>
                <button className="border-2 border-white hover:bg-white hover:text-black text-white font-normal md:py-3 md:px-6 px-4 py-1 rounded-2xl md:text-4xl text-2xl font-kanit">
                  เยี่ยมชมชุมชน →
                </button>
              </NavLink>
            </div>
          </div> */}
        </section>
        <section className='md:hidden h-[550px] bg-center' style={{ backgroundImage: 'url("https://res.cloudinary.com/dtcif0lxf/image/upload/v1757349241/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD_28_olbyqk.png")' }}>

        </section>
      </div>
      <div className='bg-[#FBFBFB] mt-4 pb-2 shadow-[rgba(0,0,0,0.35)_0px_0px_15px]'>
        <div className='pt-8 flex flex-col items-center gap-1'>
          <h1 className='text-center font-sarabun md:text-6xl text-3xl text-[#3E3E3E] font-semibold'>สินค้าประจำสัปดาห์</h1>
          <h2 className='text-center font-sarabun md:text-4xl text-lg text-white bg-[#6F8D6B] md:w-[35%] md:py-3 py-1 px-2 mt-2'><ClockHourly /></h2>
        </div>
        <div>
          <BestSeller />
        </div>
      </div>
      {/* ส่วน Why Us */}
      <div className='font-kanit bg-[#F9F6F3] py-16'>
        <div className='text-center'>
          <h1 className='md:text-6xl text-4xl font-medium text-[#6F8D6B] mb-2'>ทำไมต้อง..?</h1>
          <h2 className='bg-[#F5CEC7B2] py-3 md:text-6xl text-4xl font-medium text-[#6F8D6B] rounded-xl mx-auto md:max-w-lg max-w-xs'>
            " จอมบึงซีเล็คชั่น "
          </h2>
        </div>

        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-3 items-center justify-items-center'>
            {/* ส่งตรงจากเกษตรกร */}
            <div className='text-center md:-mt-80 mt-6'>
              <img
                src='https://res.cloudinary.com/dtcif0lxf/image/upload/v1757495815/%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%95%E0%B8%A3%E0%B8%87%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B9%80%E0%B8%81%E0%B8%A9%E0%B8%95%E0%B8%A3%E0%B8%81%E0%B8%A3_xjioax.png'
                alt="ส่งตรงจากเกษตรกร"
                className='hover:scale-105 transition-transform duration-300 md:w-[450px] w-[300px]'
              />
            </div>

            {/* ปลอดสาร 100% */}
            <div className='text-center md:mt-6'>
              <img
                src='https://res.cloudinary.com/dtcif0lxf/image/upload/v1757495815/%E0%B8%9B%E0%B8%A5%E0%B8%AD%E0%B8%94%E0%B8%AA%E0%B8%B2%E0%B8%A3100_p0whle.png'
                alt="ปลอดสาร 100%"
                className='hover:scale-105 transition-transform duration-300 md:w-[450px] w-[300px]'
              />
            </div>

            {/* สดใหม่ทุกวัน */}
            <div className='text-center md:-mt-80'>
              <img
                src='https://res.cloudinary.com/dtcif0lxf/image/upload/v1757495815/%E0%B8%AA%E0%B8%94%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%E0%B8%97%E0%B8%B8%E0%B8%81%E0%B8%A7%E0%B8%B1%E0%B8%99_appqwf.png'
                alt="สดใหม่ทุกวัน"
                className='hover:scale-105 transition-transform duration-300 md:w-[500px] w-[325px]'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home