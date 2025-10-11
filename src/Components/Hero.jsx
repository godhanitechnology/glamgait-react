"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";

const Hero = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const textScrollRef = useRef(null);
  const animationRef = useRef(null);

  // Product data with only main images
  const products = [
    {
      id: 1,
      mainImage: hero1,
    },
    {
      id: 2,
      mainImage: hero2,
    },
    {
      id: 3,
      mainImage: hero3,
    },
    {
      id: 4,
      mainImage: hero4,
    },
  ];

  return (
    // <div className="relative overflow-hidden bg-[#f6f3f0] z-0">
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
            onSwiper={setSwiperInstance}
            className="w-full"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="w-full h-full flex items-center justify-center ">
                  {/* Main product image */}
                  <img
                    src={product.mainImage || "/placeholder.svg"}
                    alt="Raha Organic Products"
                    className="w-full h-full object-contain"
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
