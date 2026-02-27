"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import axiosInstance from "../Axios/axios";
import { ApiURL } from "../Variable";

// Skeleton shown instantly while API loads — prevents blank page LCP penalty
const HeroSkeleton = () => (
  <div
    className="w-full bg-[#e8e2db] animate-pulse"
    style={{ aspectRatio: "16/7" }}
    aria-hidden="true"
  />
);

const Hero = () => {
  const [sliders, setSliders] = useState([]);
  const [loaded, setLoaded] = useState(false);

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
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    getSlider();
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-[#f6f3f0]">
      {!loaded ? (
        <HeroSkeleton />
      ) : (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={sliders.length > 1}
          speed={1000}
          navigation={false}
          pagination={false}
          className="w-full"
        >
          {sliders.map((img, index) => (
            <SwiperSlide key={img.image_id}>
              {/* aspect-ratio wrapper prevents CLS while image loads */}
              <div className="w-full" style={{ aspectRatio: "16/7" }}>
                <img
                  src={`${ApiURL}/assets/Sliders/${img?.image}`}
                  alt={`Glamgait slider ${index + 1}`}
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
      )}
    </div>
  );
};

export default Hero;
