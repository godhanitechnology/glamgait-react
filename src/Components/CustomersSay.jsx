import { useEffect, useRef, useState } from "react";

// Assets (update these with actual paths)
import waves from "../assets/waves.png";
import ReviewCard from "./ReviewCard";
import { ApiURL } from "../Variable";
import axiosInstance from "../Axios/axios";

const CustomersSay = ({ direction = "left", speed = "fast" }) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);
  const [reviewsPerPage] = useState(10);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async (page = 1) => {
    try {
      const response = await axiosInstance.post(`${ApiURL}/getalluserreviews`, {
        page,
        perPage: reviewsPerPage,
      });

      if (response.data.status === 1) {
        const data = response.data.data;
        setReviews(data.reviwes || []);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    }
  };

  useEffect(() => {
    addAnimation();
    fetchReviews();
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
          {reviews?.map((item, idx) => (
            <li key={idx} className="shrink-0">
              <ReviewCard
                name={item?.user?.first_name}
                review={item?.message}
                image={item?.image}
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
