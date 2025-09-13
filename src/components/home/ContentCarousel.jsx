//rafce
import React, { use, useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import axios from 'axios';

const ContentCarousel = () => {
    // Javascript

    const [data, setData] = useState([]);

    useEffect(() => {
        hdlgetImage()
    }, [])

    const hdlgetImage = async () => {
        // Code
        await axios.get('https://picsum.photos/v2/list?page=1&limit=15')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[Pagination, Autoplay]}
                className="mySwiper h-80 object-cover mb-4">

                {
                    data?.map((item, index) =>
                        <SwiperSlide key={index}>
                            <img src={item.download_url} />
                        </SwiperSlide>
                    )
                }
            </Swiper>

            <Swiper
                navigation={true}
                slidesPerView={5}
                spaceBetween={10}
                pagination={true}
                modules={[Pagination, Autoplay, Navigation]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                className='mySwiper h-80 object-cover rounded-md'
            >
                {
                    data?.map((item, index) =>
                        <SwiperSlide key={index}>
                            <img
                                className='rounded-lg'
                                src={item.download_url} />
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    )
}

export default ContentCarousel