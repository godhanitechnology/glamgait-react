"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import axiosInstance from "../Axios/axios";
import { ApiURL } from "../Variable";

const Hero = () => {
  const [sliders, setSliders] = useState([]);

  const getSlider = async () => {
    try {
      const response = await axiosInstance.get("/getsliders");
      if (response?.data?.status === 1) {
        setSliders(response?.data?.data);
      } else {
        setSliders([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSlider();
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-[#f6f3f0]">
      {/* Main hero content */}
      <div className="relative">
        <div className="flex flex-col items-center justify-between gap-4">
          {/* Product Carousel */}
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={1000}
            navigation={false}
            pagination={{ clickable: false }}
            onSwiper={undefined}
            className="w-full"
          >
            {sliders?.map((img, index) => (
              <SwiperSlide key={img.image_id}>
                {/* aspect-ratio wrapper prevents CLS (layout shift) while image loads */}
                <div className="w-full" style={{ aspectRatio: "16/7" }}>
                  <img
                    src={`${ApiURL}/assets/Sliders/${img?.image}`}
                    alt="Glamgait imgs"
                    className="w-full h-full object-cover"
                    width="1440"
                    height="630"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "low"}
                    decoding={index === 0 ? "sync" : "async"}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Hero;
