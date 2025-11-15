import React, { useEffect, useState } from "react";
import imgicon from "../assets/imgicon.svg";
import axiosInstance from "../Axios/axios";
import { ApiURL, userInfo } from "../Variable";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const StarIcon = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    className={`w-6 h-6 ${
      filled ? "text-yellow-400" : "text-gray-300"
    } cursor-pointer`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Review = () => {
  const { p_id } = useParams();
  const [selectedStars, setSelectedStars] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // Show first 3 reviews initially
  const user = userInfo();

  const fetchReviews = async () => {
    if (!p_id) return;
    try {
      const res = await axiosInstance.post("/getuserreviews", { p_id });
      if (res.data.status === 1) {
        setReviews(res.data.data);
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [p_id]);

  const handleStarClick = (star) => setSelectedStars(star);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.u_id) {
      console.log("Please login to submit a review");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("u_id", user.u_id);
      formData.append("p_id", p_id);
      formData.append("rating", selectedStars);
      formData.append("message", reviewContent);

      uploadedImages.forEach((file) => {
        if (file instanceof File) formData.append("userReviewImage", file);
      });

      const res = await axiosInstance.post("/adduserreview", formData);
      if (res.data.status === 1) {
        toast.success("Review added successfully!");
        setSelectedStars(5);
        setReviewTitle("");
        setReviewContent("");
        setUploadedImages([]);
        fetchReviews();
      } else {
        console.log(res.data.description || "Failed to add review");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews?.filter((r) => r.rating === star).length;
    return { stars: star, count, total: reviews?.length };
  });

  const toggleVisible = () => {
    if (visibleCount === 3) setVisibleCount(reviews?.length); // show all
    else setVisibleCount(3); // show first 3
  };

  return (
    <div className="p-4 bg-[#F3F0ED] rounded-lg">
      <div className="max-w-6xl mx-auto">
        {/* Overall Rating */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-2xl font-bold mr-2">
              {reviews?.length > 0
                ? (
                    reviews?.reduce((acc, r) => acc + r.rating, 0) /
                    reviews?.length
                  ).toFixed(1)
                : 5.0}
            </span>
            <span className="text-lg">Overall Rating</span>
          </div>
          <div className="w-full md:w-1/2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center mb-1">
                <span className="w-4">{item.stars}</span>
                <div className="w-40 bg-gray-200 h-2 mx-2 rounded">
                  <div
                    className="bg-black h-2 rounded"
                    style={{
                      width: `${
                        item.total ? (item.count / item.total) * 100 : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <span>{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        {reviews?.slice(0, visibleCount).map((review, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <div className="md:flex items-start gap-10">
              <div className="flex flex-col mr-4">
                <span className="font-bold">{review?.user?.first_name}</span>
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <StarIcon key={i} filled={i < review?.rating} />
                    ))}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {review?.createdAt?.split("T")[0]}
                </p>
                <p className="mb-2">{review?.message}</p>
                {console.log(review.image_url, "review")}

                {review?.image_url && (
                  <div className="flex items-center gap-2">
                    <img
                      src={`${ApiURL}/assets/UserReviews/${review?.image_url}`}
                      alt="review"
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {reviews?.length > 3 && (
          <button
            onClick={toggleVisible}
            className="mb-6 text-[#02382A] font-semibold"
          >
            {visibleCount === 3 ? "See More" : "See Less"}
          </button>
        )}

        {/* Write a Review */}
        <form onSubmit={handleSubmit} className="mt-8">
          <h2 className="text-xl font-bold mb-4">Write a Review</h2>
          <label className="block text-sm text-gray-600 mb-2">
            What is it like to Product?
          </label>
          <div className="flex mb-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <StarIcon
                  key={i}
                  filled={i < selectedStars}
                  onClick={() => handleStarClick(i + 1)}
                />
              ))}
          </div>
          <label className="block text-sm text-gray-600 mb-2">
            Review Content
          </label>
          <textarea
            type="text"
            value={reviewTitle}
            onChange={(e) => setReviewContent(e.target.value)}
            className="w-full p-2 rounded mb-4 bg-white"
            required
            placeholder=""
          />
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer bg-white p-2 rounded flex items-center justify-center gap-2 w-full"
            >
              <img src={imgicon} alt="" /> Upload Images
            </label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {uploadedImages?.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded ${index}`}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#02382A] hover:bg-[#ffffff] shadow-2xl text-white px-4 py-2 rounded-md border border-[#02382A] hover:text-[#02382A]"
          >
            SUBMIT REVIEW
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;
