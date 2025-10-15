import ProductCard from "./ProductCard"; // Make sure this exists
import HomePageBanner from "../Components/HomePageBanner";
import singlebanner from "../assets/singlebanner.jpg";
import axiosInstance from "../Axios/axios";
import { useEffect, useState } from "react";

const ReletedProduct = ({ cate_id, currentProductId }) => {
  
  const [relatedProducts, setRelatedProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.post(
        `/productbycategory/${cate_id}`,
        { limit: 5 }
      );
      const filteredProducts = response.data.data.filter(
        (item) => item.p_id !== currentProductId
      );
      setRelatedProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [cate_id]);
  return (
    <section className="pt-12 px-4 bg-[#F3F0ED]">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h2 className="text-[30px] md:text-[34px] xl:text-[34px] font-bold text-gray-800 mb-2">
          Related Products
        </h2>
        <p className="text-[12px] md:text-[16px] text-gray-600">
          Discover more styles you may like.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-4 overflow-x-auto lg:grid lg:grid-cols-4 md:gap-6 scrollbar-hide pb-12">
          {relatedProducts?.map((product) => (
            <div
              key={product.p_id}
              className="flex-shrink-0 w-[250px] sm:w-[240px] md:w-[250px] lg:w-[230px] xl:w-[300px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <HomePageBanner
          title="Discover Timeless Comfort"
          bgImage={singlebanner}
        />
      </div>
    </section>
  );
};

export default ReletedProduct;
