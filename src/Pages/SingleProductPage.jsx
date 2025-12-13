import React from "react";
import SingleProduct from "../Components/SingleProduct";
import StayInLoop from "../Components/StayInLoop";
import Review from "../Components/Review";
import ReletedProduct from "../Components/ReletedProduct";

const SingleProductPage = () => {
  return (
    <div>
      <SingleProduct />
      <ReletedProduct/>
      <StayInLoop />
    </div>
  );
};

export default SingleProductPage;
