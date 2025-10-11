import React, { useState } from 'react';
import imgicon from "../assets/imgicon.svg";

const StarIcon = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    className={`w-6 h-6 ${filled ? 'text-yellow-400' : 'text-gray-300'} cursor-pointer`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Review = () => {
  const [selectedStars, setSelectedStars] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('Great Product');
  const [reviewContent, setReviewContent] = useState(
    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.'
  );
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleStarClick = (star) => {
    setSelectedStars(star);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submit, e.g., console log
    console.log({
      stars: selectedStars,
      title: reviewTitle,
      content: reviewContent,
      images: uploadedImages,
    });
    // Reset form if needed
    setSelectedStars(5);
    setReviewTitle('');
    setReviewContent('');
    setUploadedImages([]);
  };

  const reviews = [
    {
      user: 'ElizabethRBKyn',
      stars: 5,
      date: '20 August, 2020',
      content: 'Warm and very attractive on. Got this to keep my husband warm on those chilly late fall days. He loves it as it not only is pretty warm but he looks good in it and he knows it.',
      images: Array(4).fill('https://via.placeholder.com/80'), // Placeholder images
    },
    {
      user: 'ElizabethRBKyn',
      stars: 5,
      date: '20 August, 2020',
      content: 'Warm and very attractive on. Got this to keep my husband warm on those chilly late fall days. He loves it as it not only is pretty warm but he looks good in it and he knows it.',
      images: Array(4).fill('https://via.placeholder.com/80'), // Placeholder images
    },
  ];

  const ratingDistribution = [
    { stars: 5, count: 4, total: 4 },
    { stars: 4, count: 0, total: 4 },
    { stars: 3, count: 0, total: 4 },
    { stars: 2, count: 0, total: 4 },
    { stars: 1, count: 0, total: 4 },
  ];

  return (
    <div className="p-4 bg-[#F3F0ED] rounded-lg">
        <div className='max-w-6xl mx-auto'>
      {/* Overall Rating */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 ">
        <div className="flex items-center mb-4 md:mb-0">
          <span className="text-2xl font-bold mr-2">5.0</span>
          <span className="text-lg">Overall Rating</span>
        </div>
        <div className="w-full md:w-1/2">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center mb-1">
              <span className="w-4">{item.stars}</span>
              <div className="w-40 bg-gray-200 h-2 mx-2 rounded">
                <div
                  className="bg-black h-2 rounded"
                  style={{ width: `${(item.count / item.total) * 100}%` }}
                ></div>
              </div>
              <span>{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      {reviews.map((review, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <div className="md:flex items-start gap-10">
            <div className="flex flex-col mr-4">
              <span className="font-bold">{review.user}</span>
              
            </div>
            <div className="flex-grow">
              <div className="flex items-center mb-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <StarIcon key={i} filled={i < review.stars} />
                  ))}
              </div>
              <p className="text-sm text-gray-600 mb-2">{review.date}</p>
              <p className="mb-2">{review.content}</p>
              {/* <div className="grid grid-cols-4 gap-2"> */}

              <div className="flex items-center justify-start gap-2">
                {review.images.map((img, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={img}
                    alt={`Review image ${imgIndex + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Write a Review */}
      <form onSubmit={handleSubmit} className="mt-8">
        <h2 className="text-xl font-bold mb-4">Write a Review</h2>
        <label className="block text-sm text-gray-600 mb-2">What is it like to Product?</label>
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
        <label className="block text-sm text-gray-600 mb-2">Review Title</label>
        <input
          type="text"
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
          className="w-full p-2 rounded mb-4 bg-white"
          placeholder="Great Product"
        />
        <label className="block text-sm text-gray-600 mb-2">Review Content</label>
        <textarea
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
          className="w-full p-2 bg-white rounded mb-4 h-32 resize-none"
          placeholder="Write a Review"
        ></textarea>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">Upload Images</label>
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
            {uploadedImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Uploaded image ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>
        <button type="submit" className="bg-[#02382A] hover:bg-[#ffffff] shadow-2xl text-white px-4 py-2 rounded-md border border-[#02382A] hover:text-[#02382A]">
          SUBMIT REVIEW
        </button>
      </form>
      </div>
    </div>
  );
};

export default Review;