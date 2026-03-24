import "swiper/css";
import { ApiURL } from "../Variable";
import { Autoplay } from "swiper/modules";
import axiosInstance from "../Axios/axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const Hero = () => {
  const [sliders, setSliders] = useState([]);

  const getSlider = async () => {
    try {
      const response = await axiosInstance.get("/getsliders");
      const data = response?.data?.data || [];
      if (response?.data?.status) {
        setSliders(data);

        // Inject a <link rel="preload"> for the first slider image as soon as
        // the URL is known — gives the browser an early fetch signal for LCP
        if (data[0]?.image) {
          const preload = document.createElement("link");
          preload.rel = "preload";
          preload.as = "image";
          preload.href = `${ApiURL}/assets/Sliders/${data[0].image}`;
          preload.fetchPriority = "high";
          document.head.appendChild(preload);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSlider();
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-[#e8e2db]"
      style={{ aspectRatio: "16/7" }}
    >
      {sliders.length > 0 && (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={sliders.length > 1}
          speed={1000}
          navigation={false}
          pagination={false}
          className="w-full h-full"
        >
          {sliders.map((img, index) => (
            <SwiperSlide key={img.image_id}>
              <div className="w-full h-full">
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
