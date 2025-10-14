// import { useRef, useState, useCallback } from "react"

// const VideoCard = ({ video, onClick }) => {
//   const { id, title, price, videoUrl, imageUrl, reviews } = video || {}
//   const videoRef = useRef(null)
//   const [isPlaying, setIsPlaying] = useState(true)

//   const handleCardClick = useCallback(() => {
//     if (onClick) {
//       onClick(id)
//     }
//   }, [onClick, id])

//   const handlePlayPause = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause()
//       } else {
//         videoRef.current.play()
//       }
//       setIsPlaying(!isPlaying)
//     }
//   }

//   return (
//     <div
//       className="relative w-full max-w-[400px]  rounded-3xl overflow-hidden cursor-pointer"
//       onClick={handleCardClick}
//     >
//       {videoUrl ? (
//         <video
//           ref={videoRef}
//           src={videoUrl}
//           className="w-full h-[500px] object-cover"
//           autoPlay
//           loop
//           muted
//           playsInline
//           onClick={e => {
//             e.stopPropagation()
//             handlePlayPause()
//           }}
//         />
//       ) : (
//         <img
//           src={
//             imageUrl ||
//             "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=800"
//           }
//           alt={title}
//           className="w-full h-[500px] object-cover"
//         />
//       )}

//       <div className="absolute bottom-4 left-4 right-4">
//         <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg">
//           <div className="flex items-start gap-3">
//             <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
//               <img
//                 src={
//                   imageUrl ||
//                   "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=200"
//                 }
//                 alt={title}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div className="flex-1 min-w-0">
//               <div className="flex items-baseline gap-2 mb-1">
//                 <span className="text-2xl font-bold text-gray-900">
//                   Rs.{price}
//                 </span>
//               </div>
//               <p className="text-xs text-gray-600 leading-relaxed">
//                 {reviews ||
//                   "Reviews from People Who Love Fancy Reviews from People Who Love Fancy"}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {!isPlaying && videoUrl && (
//         <div className="absolute inset-0 flex items-center justify-center z-10">
//           <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
//             <svg
//               className="w-8 h-8 text-white ml-1"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
//             </svg>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default VideoCard

// import { useRef, useState, useCallback } from "react"
// import { Link } from "react-router-dom"
// import videoData from "../data/video"

// const VideoCard = ({ video, onClick }) => {
//   const { id, title, price, videoUrl, reviews, to } = video || {}
//   const videoRef = useRef(null)
//   const [isPlaying, setIsPlaying] = useState(true)

//   const handleCardClick = useCallback(() => {
//     if (onClick) {
//       onClick(id)
//     }
//   }, [onClick, id])

//   const handlePlayPause = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause()
//       } else {
//         videoRef.current.play()
//       }
//       setIsPlaying(!isPlaying)
//     }
//   }

//   return (
//     <Link to={to} className="relative w-full max-w-[400px] overflow-hidden cursor-pointer" onClick={handleCardClick}>
//       {videoUrl && (
//         <video
//           ref={videoRef}
//           src={videoUrl}
//           className="w-full h-[450px] object-cover rounded-2xl"
//           autoPlay
//           loop
//           muted
//           playsInline
//           onClick={e => {
//             e.stopPropagation()
//             handlePlayPause()
//           }}
//         />
//       )}

//       <div className="absolute bottom-4 left-4 right-4">
//         <div className="bg-[#FFFFFF]/50 backdrop-blur-md rounded-2xl p-3 shadow-lg">
//           <div className="flex items-start gap-3">
//             <div className="flex-1 min-w-0">
//               <div className="flex items-baseline gap-2">
//                 <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
//               </div>
//                 <span className="text-[14px] font-bold text-gray-900">
//                   Rs.{price}
//                 </span>
//               <p className="text-xs text-gray-600 leading-relaxed">
//                 {reviews}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* {!isPlaying && videoUrl && (
//         <div className="absolute inset-0 flex items-center justify-center z-10">
//           <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
//             <svg
//               className="w-8 h-8 text-white ml-1"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
//             </svg>
//           </div>
//         </div>
//       )} */}
      
//     </Link>
//   )
// }

// export default VideoCard


import { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video, onClick }) => {
  const { id, title, price, videoUrl, reviews, to } = video || {};
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleCardClick = useCallback(() => {
    if (onClick) {
      onClick(id);
    }
  }, [onClick, id]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Link
      to={to}
      className="relative overflow-hidden cursor-pointer w-full max-w-[300px] mx-auto"
      onClick={handleCardClick}
    >
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-auto aspect-[4/6] object-cover rounded-2xl"
          autoPlay
          loop
          muted
          playsInline
          onClick={(e) => {
            e.stopPropagation();
            handlePlayPause();
          }}
        />
      )}

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-[#FFFFFF]/50 backdrop-blur-md rounded-2xl p-3 shadow-lg w-auto">
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {title}
                </h3>
              </div>
              <span className="text-[14px] font-bold text-gray-900">
                Rs.{price}
              </span>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-1">
                {reviews}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;