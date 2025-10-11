import React, { useEffect, useRef, useState } from "react";
import VideoCard from "./VideoCard";
import video from "../data/video"; // Your video data array
import waves from "../assets/waves.png";


const WatchAndBuy = () => {
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

    // Set default direction to left
    container.style.setProperty("--animation-direction", "forwards");

    // Set default speed to normal (40s)
    const durations = { fast: "20s", normal: "40s", slow: "80s" };
    container.style.setProperty("--animation-duration", durations.normal);
  }

  return (
    <section className="relative bg-[#F3F0ED] pb-16 overflow-visible">
      <div className=" relative overflow-visible z-0">
      <img
        src={waves}
        alt="Wave Bottom"
        className="hidden md:block absolute -top-50 left-0 lg:-top-60 lg:-left-10 xl:-top-60 xl:left-30 2xl:-top-60 2xl:left-90 md:h-100 md:w-80 lg:h-130 lg:w-100 rotate-45"
      />
      </div>
      {/* Title & Description */}
      <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
        <h2 className="text-[30px] md:text-[34px] xl:text-[34px] font-bold text-gray-800 mb-2">
          Watch & Buy
        </h2>
        <p className="text-[12px] md:text-[16px] text-gray-600">
          Explore our latest collection with video previews and shop now!
        </p>
      </div>

      {/* Scrollable Video List */}
      <div
        ref={containerRef}
        className="group relative z-10 w-full overflow-x-auto scrollbar-hide"
      >
        <ul
          ref={scrollerRef}
          className={`flex w-max shrink-0 flex-nowrap gap-6 py-4 px-4 ${
            start ? "animate-scroll" : ""
          }`}
        >
          {video.map((videoItem) => (
            <li key={videoItem.id} className="shrink-0 w-80">
              <VideoCard video={videoItem} />
            </li>
          ))}
        </ul>
      </div>
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
            transform: translateX(0);
          }
          100% {
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