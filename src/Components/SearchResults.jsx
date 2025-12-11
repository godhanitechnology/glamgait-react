// src/pages/SearchResults.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard"; // adjust path if needed
import axiosInstance from "../Axios/axios";
import ScrollToTop from "../Components/ScrollToTop";

const SearchResults = () => {
  ScrollToTop();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/search-products?query=${encodeURIComponent(query)}`
        );

        if (response.data.status === 1) {
          setProducts(response.data.data || []);
          setTotalResults(response.data.total || response.data.data.length);
        } else {
          setProducts([]);
          setTotalResults(0);
        }
      } catch (error) {
        console.error("Search error:", error);
        setProducts([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-[#f3f0ed] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Search Results for
          </h1>
          <p className="text-xl text-black bg-white inline-block px-6 py-2 rounded-full shadow">
            "{query}"
          </p>
          <p className="mt-4 text-gray-600">
            {loading
              ? "Searching..."
              : `${totalResults} product${totalResults !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.p_id} product={product} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && query && products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">No results</div>
            <p className="text-xl text-gray-600 mb-6">
              No products found for "<strong>{query}</strong>"
            </p>
            <Link
              to="/shop"
              className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
            >
              Browse All Products
            </Link>
          </div>
        )}

        {/* Empty Query */}
        {!loading && !query && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              Type something in the search bar to find products
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;