// export default WatchAndBuy;

// import React, { useEffect, useRef, useState } from "react";
// import VideoCard from "./VideoCard";
// import axiosInstance from "../Axios/axios";
// import { ApiURL } from "../Variable";

// const WatchAndBuy = () => {
//   const containerRef = useRef(null);
//   const ulRef = useRef(null);
//   const [products, setProducts] = useState([]);
//   const [pos, setPos] = useState(0);
//   const [isHover, setIsHover] = useState(false);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axiosInstance.post(`${ApiURL}/getproducts`, {
//         limit: 10,
//         is_expert_choice: 1,
//       });
//       setProducts(response.data.data || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     if (products.length === 0) return;

//     const itemWidth = 320; // w-80 in px (20rem * 16)
//     const gap = 24; // gap-6 in px (1.5rem * 16)
//     const itemSpace = itemWidth + gap;
//     const totalWidth =
//       itemWidth * products.length + gap * (products.length - 1);
//     const speed = totalWidth / 40; // px per second to match original 40s cycle
//     let lastTime = performance.now();
//     let animId;

//     const animate = (time) => {
//       if (isHover) {
//         lastTime = time;
//         animId = requestAnimationFrame(animate);
//         return;
//       }

//       const delta = (time - lastTime) / 1000;
//       lastTime = time;

//       setPos((prevPos) => {
//         let newPos = prevPos - speed * delta;
//         if (newPos <= -itemSpace) {
//           newPos += itemSpace;
//           setProducts((prev) => {
//             const [first, ...rest] = prev;
//             return [...rest, first];
//           });
//         }
//         return newPos;
//       });

//       animId = requestAnimationFrame(animate);
//     };

//     animId = requestAnimationFrame(animate);

//     return () => cancelAnimationFrame(animId);
//   }, [products, isHover]);

//   useEffect(() => {
//     if (ulRef.current) {
//       ulRef.current.style.transform = `translateX(${pos}px)`;
//     }
//   }, [pos]);

//   return (
//     <section className="relative bg-[#F3F0ED] pb-16 overflow-visible">
//       <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
//         <h2 className="text-[30px] md:text-[34px] font-bold text-gray-800 mb-2">
//           Watch & Buy
//         </h2>
//         <p className="text-[12px] md:text-[16px] text-gray-600">
//           Explore our latest collection with video previews and shop now!
//         </p>
//       </div>

//       <div
//         ref={containerRef}
//         className="group relative z-10 w-full overflow-x-auto scrollbar-hide"
//         onMouseEnter={() => setIsHover(true)}
//         onMouseLeave={() => setIsHover(false)}
//       >
//         <ul ref={ulRef} className="flex w-max flex-nowrap gap-6 py-4 px-4">
//           {products.map((product, index) => (
//             <li key={`${product.p_id}-${index}`} className="shrink-0 w-80">
//               <VideoCard product={product} />
//             </li>
//           ))}
//         </ul>
//       </div>

//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default WatchAndBuy;

import { useEffect, useRef, useState } from "react";
import VideoCard from "./VideoCard";
import axiosInstance from "../Axios/axios";
import { ApiURL } from "../Variable";

const WatchAndBuy = () => {
  const containerRef = useRef(null);
  const [finalProducts, setFinalProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.post(`${ApiURL}/getproducts`, {
        limit: 12,
        is_expert_choice: 1,
      });

      const data = response.data.data || [];

      setFinalProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <section className="relative bg-[#F3F0ED] pb-16 overflow-visible">
      <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
        <h2 className="text-[30px] md:text-[34px] font-bold text-gray-800 mb-2">
          Watch & Buy
        </h2>
        <p className="text-[12px] md:text-[16px] text-gray-600">
          Explore our latest collection with video previews and shop now!
        </p>
      </div>

      <div
        ref={containerRef}
        className="group relative z-10 w-full overflow-x-auto scrollbar-hide"
      >
        <ul className={`flex w-max flex-nowrap gap-6 py-4 px-4 animate-scroll`}>
          {finalProducts.map((product, index) => (
            <li key={`${product.p_id}-${index}`} className="shrink-0 w-80">
              <VideoCard product={product} />
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .group:hover .animate-scroll {
          animation-play-state: paused;
        }
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default WatchAndBuy;
