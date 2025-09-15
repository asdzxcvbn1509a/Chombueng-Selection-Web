// rafce

import React from 'react'
import { UsersRound, Leaf, Medal, Heart } from 'lucide-react';
import Footer from '../components/Footer';

const Community = () => {
    return (
        <div className='font-kanit bg-[#F9F6F3]'>
            <div>
                <div className='md:text-8xl text-3xl font-medium md:pt-24 pt-10 bg-gradient-to-b from-[#F6C2CF] to-[#F9F6F3]'>
                    <div className='flex justify-center mb-4'>
                        <p className='text-[#F49199]'>ทุกความสด</p>
                        <p className='text-[#585858]'>มีที่มา...</p>
                    </div>
                    <div className='text-center'>
                        <p className='text-[#585858]'>พบกับผู้คนที่อยู่เบื้องหลัง</p>
                    </div>
                </div>
                <div className='text-[#3E3E3E] md:text-3xl text-2xl md:pt-10 pt-6 text-center md:font-normal font-light bg-[#F9F6F3]'>
                    <p>เบื้องหลังผักสดกรอบและไข่ไก่จากฟาร์ม คือผู้คนที่ทำงานด้วยความรัก</p>
                    <p>พวกเขาเชื่อว่าอาหารที่ดี เริ่มจากการดูแลธรรมชาติอย่างใส่ใจ</p>
                </div>
                <div className='md:flex justify-center gap-48 md:pt-16 md:pb-16 md:scale-100 scale-90 bg-[#F9F6F3]'>
                    <div className='flex flex-col items-center'>
                        <div className='bg-[linear-gradient(135deg,#FFB3C6,#FFFFFF)] rounded-full p-6 text-white w-36 h-36'>
                            <UsersRound size={96} />
                        </div>
                        <p className='text-6xl font-semibold text-[#FFB3C6] mt-6'>10+</p>
                        <p className='text-2xl mt-4 text-[#3E3E3E]'>เกษตรกรท้องถิ่น</p>
                    </div>
                    <div className='flex flex-col items-center mt-16 md:mt-0'>
                        <div className='bg-[linear-gradient(135deg,#FFB3C6,#FFFFFF)] rounded-full p-6 text-white w-36 h-36'>
                            <Leaf size={96} />
                        </div>
                        <p className='text-6xl font-semibold text-[#FFB3C6] mt-6'>100%</p>
                        <p className='text-2xl mt-4 text-[#3E3E3E]'>ออร์แกนิก</p>
                    </div>
                    <div className='flex flex-col items-center mt-16 md:mt-0'>
                        <div className='bg-[linear-gradient(135deg,#FFB3C6,#FFFFFF)] rounded-full p-6 text-white w-36 h-36'>
                            <Medal size={96} />
                        </div>
                        <p className='text-6xl font-semibold text-[#FFB3C6] mt-6'>1+</p>
                        <p className='text-2xl mt-4 text-[#3E3E3E]'>ปีแห่งความชำชาญ</p>
                    </div>
                    <div className='flex flex-col items-center mt-16 md:mt-0'>
                        <div className='bg-[linear-gradient(135deg,#FFB3C6,#FFFFFF)] rounded-full p-6 text-white w-36 h-36'>
                            <Heart size={96} />
                        </div>
                        <p className='text-6xl font-semibold text-[#FFB3C6] mt-6'>500+</p>
                        <p className='text-2xl mt-4 text-[#3E3E3E]'>ลูกค้าของเรา</p>
                    </div>
                </div>
                <div className='bg-[#F6C2CF73] md:pt-8 md:pb-16 pb-6'>
                    <div className='flex justify-center md:text-8xl text-3xl font-semibold md:pt-14 pt-6'>
                        <p className='text-[#F49199]'>จอมบึงซีเล็คชั่น</p>
                        <p className='text-[#585858]'>คืออะไร ?</p>
                    </div>
                    <div className='md:text-4xl text-[#585858] mt-8 text-center leading-tight font-light px-4 hidden sm:block'>
                        <p>จอมบึงซีเลคชั่นเป็นกลุ่มกิจการเพื่อสังคมที่ต่อยอดจากโครงการวิจัยเพื่อพัฒนา</p>
                        <p>ความเป็นพลเมืองกระตือรือร้น มุ่งเสริมทักษะการแก้ปัญหา</p>
                        <p>ทักษะผู้ประกอบการและทัศนคติการเรียนรู้ตลอดชีวิตจนเกิดการรวมตัว</p>
                        <p>ของคนในชุมชนทุกช่วงวัยที่ต้องการพัฒนาชุมชนให้เข้มแข็งด้วยตนเอง</p>
                    </div>
                    <div className='md:text-4xl text-base text-[#3E3E3E] mt-4 text-center leading-tight font-light md:hidden'>
                        <p>จอมบิงซีเลคชั่นเป็นกลุ่มกิจการเพื่อสังคมที่ต่อยอด</p>
                        <p>จากโครงการวิจัยเพื่อพัฒนาความเป็นพลเมือง</p>
                        <p>กระตือรือร้น มุ่งเสริมทักษะการแก้ปัญหา</p>
                        <p>ทักษะผู้ประกอบการและทัศนคติการเรียนรู้</p>
                        <p>ตลอดชีวิตจนเกิดการรวมตัวของคนในชุมชนทุก</p>
                        <p>ช่วงวัยที่ต้องการพัฒนาชุมชนให้เข้มแข็งด้วยตนเอง</p>
                    </div>
                </div>
                <div className='md:flex justify-center pb-20 gap-20 bg-[#F9F6F3]'>
                    <div className='md:mt-20 mt-10'>
                        <div className='flex justify-center md:justify-normal md:text-6xl text-4xl font-medium'>
                            <p className='text-[#585858]'>เยี่ยมชม</p>
                            <p className='text-[#F49199]'>จอมบึงซีเล็คชัน</p>
                        </div>
                        <div className='md:text-3xl text-2xl leading-tight text-[#3E3E3E] md:mt-8 mt-4 font-light px-6 md:px-0 hidden md:block'>
                            <p>ตั้งอยู่ในพื้นที่อันเงียบสงบของอำเภอจอมบึง จังหวัดราชบุรี</p>
                            <p>ชุมชนของเรารวมกลุ่มผู้คนหลากหลายช่วงวัยที่ร่วมกันพัฒนาท้องถิ่นด้วย</p>
                            <p>แนวคิดพลเมืองกระตือรือร้น ผู้มาเยือนจะได้สัมผัสวิถีชีวิตชุมชน</p>
                            <p>เรียนรู้แนวทางการพัฒนาอย่างยั่งยืนจากคนในพื้นที่</p>
                            <p>และร่วมเปิดมุมมองใหม่สู่การพัฒนาชุมชนจากภายในอย่างแท้จริง</p>
                        </div>
                        <div className='md:text-3xl text-base leading-tight text-[#585858] md:mt-8 mt-4 font-light px-3 md:px-0 md:hidden'>
                            <p>ตั้งอยู่ในพื้นที่อันเงียบสงบของอำเภอจอมบึง</p>
                            <p>จังหวัดราชบุรี</p>
                            <p>ชุมชนของเรารวมกลุ่มผู้คนหลากหลายช่วงวัยที่ร่วมกัน</p>
                            <p>พัฒนาท้องถิ่นด้วยแนวคิดพลเมืองกระตือรือร้น</p>
                            <p>ผู้มาเยือนจะได้สัมผัสวิถีชีวิตชุมชน</p>
                            <p>เรียนรู้แนวทางการพัฒนาอย่างยั่งยืนจากคนในพื้นที่</p>
                            <p>และร่วมเปิดมุมมองใหม่สู่การพัฒนาชุมชนจากภายใน</p>
                            <p>อย่างแท้จริง</p>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className="md:w-[558px] w-[350px] h-[240px] md:h-[383px] max-w-5xl rounded-2xl overflow-hidden mt-10">
                            <iframe
                                className="w-full h-full border-0"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124084.27338318429!2d99.6127354!3d13.619179299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e33947683497d3%3A0x404fb54b009ece0!2z4LiV4Liz4Lia4LilIOC4iOC4reC4oeC4muC4tuC4hyDguK3guLPguYDguKDguK0g4LiI4Lit4Lih4Lia4Li24LiHIOC4o-C4suC4iuC4muC4uOC4o-C4tSA3MDE1MA!5e0!3m2!1sth!2sth!4v1755539539770!5m2!1sth!2sth"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Community