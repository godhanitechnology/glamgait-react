import { useState, useEffect } from "react";
import { PlusCircle, Trash2, X, Check, Upload } from "lucide-react";
import { ApiURL, userInfo } from "../../Variable";
import toast from "react-hot-toast";
import axiosInstance from "../../Axios/axios";

const ProductModal = ({ isOpen, onClose, product, refreshProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    cate_id: "",
    sc_id: "",
    f_id: "",
    work_id: "",
    occasion_id: "",
    style_id: "",
    price: "",
    original_price: "",
    description: "",
    model: "",
    fit: "",
    sku: "",
    meta_title: "",
    meta_description: "",
    keywords: "",
    is_expert_choice: false,
    colors: [{ color_id: "", productimages: [] }],
    sizes: [{ size_id: "" }],
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [works, setWorks] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [styles, setStyles] = useState([]);

  const [colorsList, setColorsList] = useState([]);
  const [sizesList, setSizesList] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [existingMedia, setExistingMedia] = useState([]);
  const [deletedMediaIds, setDeletedMediaIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingSizes, setExistingSizes] = useState([]);

  const userData = userInfo();
  const token = userData?.token;

  // Fetch all categories initially
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get(`${ApiURL}/getcategory`);
        setCategories(res?.data?.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories, colors, and sizes (unchanged)
  useEffect(() => {
    if (!formData.cate_id) return;

    const fetchCategoryData = async () => {
      try {
        const [
          subRes,
          fabricRes,
          workRes,
          occRes,
          styleRes,
          colorRes,
          sizeRes,
        ] = await Promise.all([
          axiosInstance.get(`${ApiURL}/getsubcategory/${formData.cate_id}`),
          axiosInstance.get(`${ApiURL}/getfabrics/${formData.cate_id}`),
          axiosInstance.get(`${ApiURL}/getworks/${formData.cate_id}`),
          axiosInstance.get(`${ApiURL}/getoccasions/${formData.cate_id}`),
          axiosInstance.get(`${ApiURL}/getstyles/${formData.cate_id}`),
          axiosInstance.get(`${ApiURL}/getcolor`),
          axiosInstance.get(`${ApiURL}/getsize/${formData.cate_id}`),
        ]);

        setSubCategories(subRes.data.data || []);
        setFabrics(fabricRes.data.data || []);
        setWorks(workRes.data.data || []);
        setOccasions(occRes.data.data || []);
        setStyles(styleRes.data.data || []);
        setColorsList(colorRes.data.data || []);
        setSizesList(sizeRes.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategoryData();
  }, [formData.cate_id]);

  // Populate form for edit
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        cate_id: product.cate_id || "",
        sc_id: product.sc_id || "",
        f_id: product.f_id || "",
        work_id: product.work_id || "",
        occasion_id: product.occasion_id || "",
        style_id: product.style_id || "",
        price: product.price || "",
        original_price: product.original_price || "",
        description: product.description || "",
        model: product.model || "",
        fit: product.fit || "",
        sku: product.sku || "",
        meta_title: product.meta_title || "",
        meta_description: product.description || "",
        keywords: product.keywords || "",
        is_expert_choice: product.is_expert_choice || false,
        colors: product.productcolors?.length
          ? product.productcolors.map((color) => ({
              color_id: color.color_id,
              productimages: [],
            }))
          : [{ color_id: "", productimages: [] }],
        sizes: product.productsizes?.length
          ? product.productsizes.map((size) => ({ size_id: size.size_id }))
          : [{ size_id: "" }],
      });

      setExistingMedia(product.productcolors || []);
      setDeletedMediaIds([]);
      setMediaPreviews([]);
    }
  }, [product]);

  useEffect(() => {
    return () => {
      mediaPreviews.forEach((previewGroup) =>
        previewGroup?.forEach((preview) => URL.revokeObjectURL(preview))
      );
    };
  }, [mediaPreviews]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleColorChange = (index, field, value) => {
    const updatedColors = [...formData.colors];
    updatedColors[index] = { ...updatedColors[index], [field]: value };
    setFormData((prev) => ({ ...prev, colors: updatedColors }));
  };

  const addColorField = () => {
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { color_id: "", productimages: [] }], // Consistent: 'productimages'
    }));
    // Add slots for new color
    setMediaPreviews((prev) => [...prev, []]);
    setExistingMedia((prev) => [
      ...prev,
      { color_name: "", productimages: [] },
    ]);
    setDeletedMediaIds((prev) => [...prev, []]);
  };

  const removeColorField = (index) => {
    setDeletedMediaIds((prev) => {
      const newDeleted = [...prev];
      newDeleted[index] = [...(newDeleted[index] || [])];
      return newDeleted;
    });

    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
    setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
    setExistingMedia((prev) => prev.filter((_, i) => i !== index));

    setDeletedMediaIds((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (colorIndex, e) => {
    const files = Array.from(e.target.files);
    const maxImages = 10; // Adjust as needed
    const currentImages = formData.colors[colorIndex].productimages || []; // FIX: Use 'productimages'
    const existingImages = existingMedia[colorIndex]?.productimages || [];
    if (
      currentImages.length + files.length + existingImages.length >
      maxImages
    ) {
      console.log(
        `You can upload a maximum of ${maxImages} productimages per color`
      );
      return;
    }

    setFormData((prev) => {
      const updatedColors = [...prev.colors];
      updatedColors[colorIndex].productimages = [...currentImages, ...files]; // FIX: Use 'productimages'
      return { ...prev, colors: updatedColors };
    });

    setMediaPreviews((prev) => {
      const newPreviews = [...prev];
      newPreviews[colorIndex] = [
        ...(newPreviews[colorIndex] || []),
        ...files.map((file) => URL.createObjectURL(file)),
      ];
      return newPreviews;
    });
  };

  const removeMediaPreview = (colorIndex, mediaIndex) => {
    setFormData((prev) => {
      const updatedColors = [...prev.colors];
      // FIX: Now correctly filters from 'productimages' (where files are stored)
      updatedColors[colorIndex].productimages = updatedColors[
        colorIndex
      ].productimages.filter((_, i) => i !== mediaIndex);
      return { ...prev, colors: updatedColors };
    });

    setMediaPreviews((prev) => {
      const newPreviews = [...prev];
      const revoked = newPreviews[colorIndex]?.[mediaIndex];
      if (revoked) URL.revokeObjectURL(revoked);
      newPreviews[colorIndex] = newPreviews[colorIndex].filter(
        (_, i) => i !== mediaIndex
      );
      return newPreviews;
    });
  };

  const handleDeleteExistingMedia = (colorIndex, mediaId) => {
    setExistingMedia((prev) => {
      const newExistingMedia = [...prev];
      newExistingMedia[colorIndex].productimages = newExistingMedia[
        colorIndex
      ].productimages.filter((media) => media.image_id !== mediaId);
      return newExistingMedia;
    });

    setDeletedMediaIds((prev) => {
      const newDeletedMediaIds = [...prev];
      newDeletedMediaIds[colorIndex] = [
        ...(newDeletedMediaIds[colorIndex] || []),
        mediaId,
      ];
      return newDeletedMediaIds;
    });

    toast.success("Image marked for removal");
  };

  const handleSizeChange = (index, value) => {
    const updatedSizes = [...formData.sizes];
    updatedSizes[index] = { ...updatedSizes[index], size_id: value };
    setFormData((prev) => ({ ...prev, sizes: updatedSizes }));
  };

  const addSizeField = () => {
    setFormData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { size_id: "" }],
    }));
  };

  const removeSizeField = (index) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));
    setExistingSizes((prev) => {
      const newExistingSizes = [...prev];
      newExistingSizes.splice(index, 1);
      return newExistingSizes;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields (unchanged)
    if (!formData.name.trim()) {
      console.log("Product name is required");
      setIsSubmitting(false);
      return;
    }
    // if (!formData.sc_id) {
    //   console.log("Sub-Category is required");
    //   setIsSubmitting(false);
    //   return;
    // }
    // if (!formData.f_id) {
    //   console.log("fabric is required");
    //   setIsSubmitting(false);
    //   return;
    // }

    // Validate colors
    // if (formData.colors.some((color) => !color.color_id)) {
    //   console.log("Please select a color for each color field");
    //   setIsSubmitting(false);
    //   return;
    // }

    // // Validate sizes
    // if (formData.sizes.some((size) => !size.size_id)) {
    //   console.log("Please select a size for each size field");
    //   setIsSubmitting(false);
    //   return;
    // }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("cate_id", formData.cate_id);

    data.append("sc_id", formData.sc_id);
    data.append("f_id", formData.f_id);
    data.append("work_id", formData.work_id); // Added
    data.append("occasion_id", formData.occasion_id);
    data.append("style_id", formData.style_id);

    data.append("price", formData.price);
    data.append("original_price", formData.original_price);
    data.append("description", formData.description);
    data.append("model", formData.model);
    data.append("fit", formData.fit);
    data.append("sku", formData.sku);
    data.append("meta_title", formData.meta_title);
    data.append("meta_description", formData.meta_description);
    data.append("keywords", formData.keywords);
    data.append("is_expert_choice", formData.is_expert_choice ? "1" : "0");

    data.append(
      "colors",
      JSON.stringify(
        formData.colors.map((c) => ({
          color_id: c.color_id,
        }))
      )
    );

    // Append sizes JSON
    data.append(
      "sizes",
      JSON.stringify(
        formData.sizes.map((s) => ({
          size_id: s.size_id,
        }))
      )
    );

    // FIX: Append productimages for each color using 'productimages' property
    formData.colors.forEach((color, colorIndex) => {
      color.productimages.forEach((image) => {
        // Changed from 'productimages'
        data.append(`images_color_${colorIndex}`, image);
      });
    });

    if (product) {
      data.append("p_id", product.p_id);
      data.append("deleted_media", JSON.stringify(deletedMediaIds));
    }

    try {
      const url = product
        ? `${ApiURL}/updateproduct/${product.p_id}`
        : `${ApiURL}/insertproduct`;
      const method = product ? "post" : "post";

      const response = await axiosInstance({
        method,
        url,
        data,
      });

      if (response.data.status === 1) {
        toast.success(
          product
            ? "Product updated successfully"
            : "Product created successfully"
        );
        refreshProducts();
        onClose();
      } else {
        console.log(
          response.data.description ||
            (response.data.errors?.media
              ? "Media upload failed: " + response.data.errors.media
              : "Failed to save product")
        );
      }
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* All form fields unchanged - grid, inputs, etc. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-black rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-300 bg-white shadow-sm"
                aria-required="true"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="cate_id"
                value={formData.cate_id}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-black rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-300 bg-white shadow-sm"
                aria-required="true"
              >
                <option value="">Select Category</option>
                {categories?.map((category) => (
                  <option key={category.cate_id} value={category.cate_id}>
                    {category.cate_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Collection *
              </label>
              <select
                name="sc_id"
                value={formData.sc_id}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-black rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-300 bg-white shadow-sm"
                aria-required="true"
              >
                <option value="">Select Category</option>
                {subcategories?.map((category) => (
                  <option key={category.sc_id} value={category.sc_id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fabric *
              </label>
              <select
                name="f_id"
                value={formData.f_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              >
                <option value="">Select</option>
                {fabrics.map((f) => (
                  <option key={f.f_id} value={f.f_id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Work */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work *
              </label>
              <select
                name="work_id"
                value={formData.work_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              >
                <option value="">Select</option>
                {works?.map((w) => (
                  <option key={w.work_id} value={w.work_id}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Occasion */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Occasion *
              </label>
              <select
                name="occasion_id"
                value={formData.occasion_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              >
                <option value="">Select</option>
                {occasions?.map((o) => (
                  <option key={o.occasion_id} value={o.occasion_id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Style *
              </label>
              <select
                name="style_id"
                value={formData.style_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              >
                <option value="">Select</option>
                {styles?.map((o) => (
                  <option key={o.style_id} value={o.style_id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              />
            </div>

            {/* Original Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original Price
              </label>
              <input
                type="number"
                name="original_price"
                value={formData.original_price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              />
            </div>

            {/* Fit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fit
              </label>
              <input
                type="text"
                name="fit"
                value={formData.fit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              />
            </div>
            {/* SKU */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU *
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                placeholder="e.g., DRS-1023-BLK"
              />
            </div>

            {/* Meta Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                name="meta_title"
                value={formData.meta_title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                placeholder="Short SEO title for product"
              />
            </div>

            {/* Meta Description */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                name="meta_description"
                value={formData.meta_description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none min-h-[80px]"
                placeholder="Short product SEO description (max 160 characters)"
              />
            </div>

            {/* Keywords */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Keywords
              </label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                placeholder="e.g., silk saree, designer dress, festive wear"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none min-h-[100px]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <input
                type="checkbox"
                name="is_expert_choice"
                checked={formData.is_expert_choice}
                onChange={handleInputChange}
                className="mr-2 h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
              />
              Add To Reel Section
            </label>
          </div>

          {/* Colors Section - unchanged JSX */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Colors and Images
            </label>
            {formData.colors.map((color, colorIndex) => (
              <div
                key={colorIndex}
                className="border border-black rounded p-4 mb-4 bg-gray-50"
              >
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-3">
                  <select
                    value={color.color_id}
                    onChange={(e) =>
                      handleColorChange(colorIndex, "color_id", e.target.value)
                    }
                    className="w-full sm:w-1/2 px-4 py-2.5 border border-black rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-300 bg-white shadow-sm"
                    aria-label={`Select color ${colorIndex + 1}`}
                  >
                    <option value="">Select Color</option>
                    {colorsList.map((c) => (
                      <option key={c.color_id} value={c.color_id}>
                        {c.color_name}
                      </option>
                    ))}
                  </select>
                  <label className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-2.5 border border-black rounded bg-white shadow-sm cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Upload Images/Videos</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={(e) => handleFileChange(colorIndex, e)}
                      className="hidden"
                    />
                  </label>
                  {formData.colors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeColorField(colorIndex)}
                      className="text-gray-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                      aria-label={`Remove color ${colorIndex + 1}`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
                {existingMedia[colorIndex]?.productimages?.length > 0 && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Existing Images for{" "}
                      {existingMedia[colorIndex]?.color_name ||
                        "Selected Color"}
                    </label>
                    <div className="flex gap-3 flex-wrap">
                      {existingMedia[colorIndex].productimages.map((image) => (
                        <div key={image.image_id} className="relative">
                          <img
                            src={`${ApiURL}/assets/Products/${image.image_url}`}
                            alt={`Existing image ${image.image_id}`}
                            className="w-24 h-24 object-cover rounded-lg shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteExistingMedia(
                                colorIndex,
                                image.image_id
                              )
                            }
                            className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors duration-200"
                            aria-label={`Remove existing image ${image.image_id}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {mediaPreviews[colorIndex]?.length > 0 && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Image Previews
                    </label>
                    <div className="flex gap-3 flex-wrap">
                      {mediaPreviews[colorIndex].map((preview, mediaIndex) => (
                        <div key={mediaIndex} className="relative">
                          <img
                            src={preview}
                            alt={`Preview image ${mediaIndex + 1}`}
                            className="w-24 h-24 object-cover rounded-lg shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeMediaPreview(colorIndex, mediaIndex)
                            }
                            className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors duration-200"
                            aria-label={`Remove preview image ${
                              mediaIndex + 1
                            }`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addColorField}
              className="text-gray-700 hover:text-gray-900 text-sm flex items-center gap-1 transition-colors duration-200"
              aria-label="Add new color field"
            >
              <PlusCircle className="w-4 h-4" />
              Add Color
            </button>
          </div>

          {/* Sizes Section - unchanged */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sizes
            </label>
            {formData.sizes.map((size, sizeIndex) => (
              <div
                key={sizeIndex}
                className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-3 border border-black rounded p-3 bg-gray-50"
              >
                <select
                  value={size.size_id}
                  onChange={(e) => handleSizeChange(sizeIndex, e.target.value)}
                  className="w-full sm:w-3/4 px-4 py-2.5 border border-black rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-300 bg-white shadow-sm"
                  aria-label={`Select size ${sizeIndex + 1}`}
                >
                  <option value="">Select Size</option>
                  {sizesList.map((s) => (
                    <option key={s.size_id} value={s.size_id}>
                      {s.size_name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeSizeField(sizeIndex)}
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                  aria-label={`Remove size ${sizeIndex + 1}`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSizeField}
              className="text-gray-700 hover:text-gray-900 text-sm flex items-center gap-1 transition-colors duration-200"
              aria-label="Add new size field"
            >
              <PlusCircle className="w-4 h-4" />
              Add Size
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-all duration-200 shadow-sm text-sm font-medium"
              aria-label="Cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 py-2.5 bg-black text-white rounded hover:bg-gray-900 transition-all duration-200 shadow-sm text-sm font-medium ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label={product ? "Update product" : "Create product"}
            >
              {isSubmitting ? "Saving..." : product ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
