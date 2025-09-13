//rafce
import React, { use, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Slider = () => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
        >
            <SwiperSlide><img className='h-[750px] w-full' src='https://scontent.fbkk29-5.fna.fbcdn.net/v/t39.30808-6/517383733_122155906022604785_4776840530462327532_n.jpg?stp=cp6_dst-jpegr_s600x600_tt6&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=0ltCNkapdT0Q7kNvwE2aaMD&_nc_oc=Adlaqg3LgO0Wc9OTGyk4rmO4BXAZzzzRQOKeb6C7FfzL-bo0NECIPNAKo_v7WXilnNg&_nc_zt=23&se=-1&_nc_ht=scontent.fbkk29-5.fna&_nc_gid=Wm0OkoO7vOb68dTe9ciq1w&oh=00_AfU8JiJv_HQKI6ItmGH4SwgcPfyzw6kH6_Wmc2rrv6oPsw&oe=68A413F0' /></SwiperSlide>
            <SwiperSlide><img className='h-[750px] w-full' src='https://scontent.fbkk29-6.fna.fbcdn.net/v/t39.30808-6/516662430_122155906922604785_4377031445909916786_n.jpg?stp=cp6_dst-jpegr_tt6&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=q_i7Qry-aoEQ7kNvwHpaAFE&_nc_oc=Adnk8-CAExjgn2YqXeXBEV_s89r2A6ukfCKmOtxDcZABD3nbQ19uR-1Y0zNOSpJzbbs&_nc_zt=23&se=-1&_nc_ht=scontent.fbkk29-6.fna&_nc_gid=UWWs7dt9H_BSd7frpCel_g&oh=00_AfUtm3VvS15mumCn8ESjoPrlTuHQ7pYXmGWMcxEf4P2ciw&oe=68A3F881' /></SwiperSlide>
        </Swiper>
    )
}

export default Slider