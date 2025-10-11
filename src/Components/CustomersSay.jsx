// import React, { useEffect, useRef, useState } from "react";
// import reviews from "../data/review";

// // Assets (update these with actual paths)
// import waves from "../assets/waves.png";
// import rightlight from "../assets/rightlight.png";
// import quoteLeft from "../assets/quoteLeft.png";
// import pattern from "../assets/pattern.png";

// const CustomersSay = ({ direction = "left", speed = "fast" }) => {
//   const containerRef = useRef(null);
//   const scrollerRef = useRef(null);
//   const [start, setStart] = useState(false);

//   useEffect(() => {
//     addAnimation();
//   }, []);

//   function addAnimation() {
//     if (containerRef.current && scrollerRef.current) {
//       const scrollerContent = Array.from(scrollerRef.current.children);
//       scrollerContent.forEach((item) => {
//         const duplicatedItem = item.cloneNode(true);
//         scrollerRef.current.appendChild(duplicatedItem);
//       });

//       setScrollProperties();
//       setStart(true);
//     }
//   }

//   function setScrollProperties() {
//     const container = containerRef.current;
//     if (!container) return;

//     container.style.setProperty(
//       "--animation-direction",
//       direction === "left" ? "forwards" : "reverse"
//     );

//     const durations = { fast: "20s", normal: "40s", slow: "80s" };
//     container.style.setProperty(
//       "--animation-duration",
//       durations[speed] || "40s"
//     );
//   }

//   return (
//     <section className="relative bg-white dark:bg-black py-16 overflow-hidden">
//       {/* Decorative Waves */}
//       <img
//         src={waves}
//         alt="Wave Top"
//         className="absolute top-0 right-0 w-40 md:w-64 opacity-30 z-0"
//       />
//       <img
//         src={waves}
//         alt="Wave Bottom"
//         className="absolute bottom-0 left-0 w-40 md:w-64 opacity-30 z-0"
//       />

//       {/* Title & Description */}
//       <div className="text-center max-w-2xl mx-auto mb-10 relative z-10 px-4">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
//           What Our Customers Say
//         </h2>
//         <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
//           Real reviews from real people. Here’s what our customers have to say about their experience.
//         </p>
//       </div>

//       {/* Review Scroller */}
//       <div
//         ref={containerRef}
//         className="group relative z-10 max-w-7xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
//       >
//         <ul
//           ref={scrollerRef}
//           className={`flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4 ${
//             start ? "animate-scroll" : ""
//           }`}
//         >
//           {reviews.map((item, idx) => (
//             <li
//               key={idx}
//               className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-zinc-200 bg-[linear-gradient(180deg,#fafafa,#f5f5f5)] dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)] px-6 py-6 md:w-[450px] overflow-hidden"
//             >
//               {/* Pattern */}
//               <img
//                 src={pattern}
//                 alt="Pattern"
//                 className="absolute left-0 top-0 w-28 opacity-10 z-0"
//               />
//               {/* Quote Icons */}
//               <img
//                 src={quoteLeft}
//                 alt="Quote Left"
//                 className="absolute left-4 top-4 w-6 opacity-40 z-10"
//               />
//               <img
//                 src={quoteLeft}
//                 alt="Quote Right"
//                 className="absolute right-4 bottom-4 w-6 opacity-40 z-10"
//               />
//               {/* Light Overlay Right */}
//               <img
//                 src={rightlight}
//                 alt="Light Overlay"
//                 className="absolute right-0 top-0 h-full opacity-10 z-0"
//               />

//               <blockquote className="relative z-20">
//                 <div className="flex items-center gap-3 mb-3">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-10 h-10 rounded-full object-cover border"
//                   />
//                   <div>
//                     <p className="text-sm font-semibold text-gray-800 dark:text-white">
//                       {item.name}
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">{item.review}</p>
//               </blockquote>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Scroll Animation */}
//       <style jsx>{`
//         .animate-scroll {
//           animation: scroll var(--animation-duration) linear infinite;
//           animation-direction: var(--animation-direction);
//         }
//         .group:hover .animate-scroll {
//           animation-play-state: paused;
//         }
//         @keyframes scroll {
//           0% {
//             transform: translateX(0%);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default CustomersSay;


import React, { useEffect, useRef, useState } from "react";
import reviews from "../data/review";

// Assets (update these with actual paths)
import waves from "../assets/waves.png";
import ReviewCard from "./ReviewCard";

const CustomersSay = ({ direction = "left", speed = "fast" }) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current.appendChild(duplicatedItem);
      });

      setScrollProperties();
      setStart(true);
    }
  }

  function setScrollProperties() {
    const container = containerRef.current;
    if (!container) return;

    container.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );

    const durations = { fast: "20s", normal: "40s", slow: "80s" };
    container.style.setProperty(
      "--animation-duration",
      durations[speed] || "40s"
    );
  }

  return (
    <section className="relative bg-[#F3F0ED] py-16 overflow-hidden">
      {/* Decorative Waves */}
      <img
        src={waves}
        alt="Wave Top"
        className="hidden md:block absolute top-0 right-0 md:-top-10 md:right-10 lg:right-20 lg:-top-20 xl:right-50 xl:-top-20  w-40 md:w-64 rotate-45 lg:h-90 lg:w-80 2xl:h-120 2xl:w-120 2xl:right-100 2xl:-top-50"
      />
      

      {/* Title & Description */}
      
      <div className="text-center max-w-2xl mx-auto mb-10 relative z-10 px-4">
        <h2 className="text-[30px] md:text-[34px] xl:text-[34px] font-bold text-gray-800 mb-2">
          What Customers Saying
        </h2>
        <p className="text-[12px] md:text-[16px] text-gray-600">
          Reviews from People Who Love Fancy
        </p>
      </div>

      {/* Review Scroller */}
      
      <div
        ref={containerRef}
        className="group relative z-10 w-full overflow-hidden"
      >
        <ul
          ref={scrollerRef}
          className={`flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4 ${
            start ? "animate-scroll" : ""
          }`}
        >
          {reviews.map((item, idx) => (
            <li key={idx} className="shrink-0">
              <ReviewCard
                name={item.name}
                review={item.review}
                image={item.image}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Scroll Animation */}
      <style jsx>{`
        .animate-scroll {
          animation: scroll var(--animation-duration) linear infinite;
          animation-direction: var(--animation-direction);
        }
        .group:hover .animate-scroll {
          animation-play-state: paused;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default CustomersSay;