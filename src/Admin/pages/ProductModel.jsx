import { useState, useEffect } from "react";
import { PlusCircle, Trash2, X } from "lucide-react";
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
    sku: "",
    meta_title: "",
    meta_description: "",
    keywords: "",
    is_expert_choice: false,
    weight: "",
    length: "",
    width: "",
    height: "",
    colors: [{ color_id: "", images: [] }],
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

  const [stockMatrix, setStockMatrix] = useState({}); // color_id-psize_id
  const [colorQuantities, setColorQuantities] = useState({}); // color_id only for no-size products
  const [colorIdToPColorId, setColorIdToPColorId] = useState({});


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
        meta_title: product.meta_title || "",
        meta_description: product.meta_description || "",
        keywords: product.keywords || "",
        is_expert_choice: product.is_expert_choice || false,
        description: product.description || "",
        weight: product.weight || "",
        length: product.length || "",
        width: product.width || "",
        height: product.height || "",
        sku: product.sku || "",
        colors: product.productcolors?.map((pc) => ({
          color_id: pc.color_id,
          images: [],
        })) || [{ color_id: "", images: [] }],
        sizes: product.productsizes?.map((ps) => ({
          size_id: ps.size_id,
        })) || [{ size_id: "" }],
      });

      // Build pcolor_id mapping
      const mapping = {};
      product.productcolors?.forEach((pc) => {
        mapping[pc.color_id] = pc.pcolor_id;
      });
      setColorIdToPColorId(mapping);
      
      // Load stock: size-based or color-only
      if (product.has_sizes && product.productvariants) {
      const stock = {};
      product.productvariants.forEach((v) => {
        if (v.pcolor_id && v.psize_id) {
          const key = `${v.color_id}-${v.size_id}`;
          stock[key] = v.remaining_qty || 0;
        }
      });
      // Ensure every cell exists with at least 0
      product.productcolors?.forEach((pc) => {
        product.productsizes?.forEach((ps) => {
          const key = `${pc.color_id}-${ps.size_id}`;
          if (!(key in stock)) stock[key] = 0;
        });
      });
      setStockMatrix(stock);
    } else if (product.productvariants) {
      const qtyMap = {};
      product.productvariants.forEach((v) => {
        if (v.pcolor_id && !v.psize_id) {
          const colorId = Object.keys(mapping).find(
            (cid) => mapping[cid] === v.pcolor_id
          );
          if (colorId) qtyMap[colorId] = v.remaining_qty || 0;
        }
      });
      setColorQuantities(qtyMap);
    }

      // Existing images
      setExistingMedia(
        product.productcolors?.map((pc) => ({
          pcolor_id: pc.pcolor_id,
          color_name: pc.color?.color_name,
          images: pc.productimages || [],
        })) || []
      );
    }
  }, [product]);

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

  useEffect(() => {
    if (formData.cate_id) {
      Promise.all([
        axiosInstance
          .get(`${ApiURL}/getcolor`)
          .then((r) => setColorsList(r.data.data || [])),
        axiosInstance
          .get(`${ApiURL}/getsize/${formData.cate_id}`)
          .then((r) => setSizesList(r.data.data || [])),
        axiosInstance
          .get(`${ApiURL}/getsubcategory/${formData.cate_id}`)
          .then((r) => setSubCategories(r.data.data || [])),
        axiosInstance
          .get(`${ApiURL}/getworks/${formData.cate_id}`)
          .then((r) => setWorks(r.data.data || [])),
        axiosInstance
          .get(`${ApiURL}/getfabrics/${formData.cate_id}`)
          .then((r) => setFabrics(r.data.data || [])),
        axiosInstance
          .get(`${ApiURL}/getstyles/${formData.cate_id}`)
          .then((r) => setStyles(r.data.data || [])),
        axiosInstance
          .get(`${ApiURL}/getoccasions/${formData.cate_id}`)
          .then((r) => setOccasions(r.data.data || [])),
      ]).catch((err) => console.error(err));
    }
  }, [formData.cate_id]);

  const handleStockChange = (colorId, sizeId, value) => {
    const num = value === "" ? 0 : parseInt(value, 10) || 0;
    const key = `${colorId}-${sizeId}`;
    setStockMatrix((prev) => ({ ...prev, [key]: num }));
  };

  const handleColorQuantityChange = (colorId, value) => {
    const num = value === "" ? 0 : parseInt(value, 10) || 0;
    setColorQuantities((prev) => ({ ...prev, [colorId]: num }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("cate_id", formData.cate_id);
    data.append("sc_id", formData.sc_id);
    data.append("f_id", formData.f_id);
    data.append("work_id", formData.work_id);
    data.append("occasion_id", formData.occasion_id);
    data.append("style_id", formData.style_id);
    data.append("price", formData.price);
    data.append("original_price", formData.original_price || 0);
    data.append("description", formData.description);
    data.append("weight", formData.weight);
    data.append("length", formData.length);
    data.append("width", formData.width);
    data.append("height", formData.height);
    data.append("sku", formData.sku);
    data.append("meta_title", formData.meta_title);
    data.append("meta_description", formData.meta_description);
    data.append("keywords", formData.keywords);
    data.append("is_expert_choice", formData.is_expert_choice);

    data.append(
      "colors",
      JSON.stringify(formData.colors.map((c) => ({ color_id: c.color_id })))
    );
    data.append(
      "sizes",
      JSON.stringify(formData.sizes.map((s) => ({ size_id: s.size_id })))
    );

    formData.colors.forEach((color, i) => {
      color.images.forEach((img) => data.append(`images_color_${i}`, img));
    });

    if (product) data.append("deleted_media", JSON.stringify(deletedMediaIds));

     try {
      const url = product ? `${ApiURL}/updateproduct/${product.p_id}` : `${ApiURL}/insertproduct`;
      const res = await axiosInstance.post(url, data);

      if (res.data.status === 1) {
        const p_id = product?.p_id || res.data.data.p_id;

        // Fetch fresh product to get pcolor_id & psize_id mappings
        const fullRes = await axiosInstance.post(`${ApiURL}/getproductbyid/${p_id}`);
        const fullProduct = fullRes.data.data;

        const pColorMap = {};
        fullProduct.productcolors.forEach((pc) => (pColorMap[pc.color_id] = pc.pcolor_id));

        const pSizeMap = {};
        fullProduct.productsizes.forEach((ps) => (pSizeMap[ps.size_id] = ps.psize_id));

        const stockPromises = [];

        const hasSelectedSizes = formData.sizes.some((s) => s.size_id);

        if (hasSelectedSizes) {
          // Size + Color matrix
          Object.entries(stockMatrix).forEach(([key, qty]) => {
            const [color_id, size_id] = key.split("-");
            const pcolor_id = pColorMap[color_id];
            const psize_id = pSizeMap[size_id];
            if (pcolor_id && psize_id && qty >= 0) {
              stockPromises.push(
                axiosInstance.post(`${ApiURL}/addstock`, {
                  p_id,
                  pcolor_id,
                  psize_id,
                  qty_to_add: qty,
                })
              );
            }
          });
        } else {
          // Color-only
          Object.entries(colorQuantities).forEach(([color_id, qty]) => {
            const pcolor_id = pColorMap[color_id];
            if (pcolor_id && qty >= 0) {
              stockPromises.push(
                axiosInstance.post(`${ApiURL}/addstock`, {
                  p_id,
                  pcolor_id,
                  psize_id: null,
                  qty_to_add: qty,
                })
              );
            }
          });
        }

        if (stockPromises.length > 0) await Promise.all(stockPromises);

        toast.success(product ? "Product & stock updated!" : "Product created with stock!");
        refreshProducts();
        onClose();
      }
    } catch (err) {
      toast.error("Failed: " + (err.response?.data?.description || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;
  const hasSelectedSizes = formData.sizes.some((s) => s.size_id);


  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* All form fields unchanged */}
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
                className="w-full px-4 py-2.5 border border-black rounded focus:ring-2 focus:ring-gray-500 outline-none"
                required
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
                className="w-full px-4 py-2.5 border border-black rounded focus:ring-2 focus:ring-gray-500 outline-none"
                required
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
                className="w-full px-4 py-2.5 border border-black rounded focus:ring-2 focus:ring-gray-500 outline-none"
              >
                <option value="">Select Collection</option>
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
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                required
              />
            </div>
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
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight
              </label>
              <input
                type="number"
                name="weight"
                placeholder="Weight in Kg"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Length
              </label>
              <input
                type="number"
                name="length"
                placeholder="length in cm"
                value={formData.length}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Width
              </label>
              <input
                type="number"
                name="width"
                placeholder="width in cm"
                value={formData.width}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height
              </label>
              <input
                type="number"
                name="height"
                placeholder="height in cm"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              />
            </div>
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
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                name="meta_description"
                value={formData.meta_description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none min-h-[80px]"
              />
            </div>
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

          {/* Color section */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Colors & Images</h3>
            {formData.colors.map((color, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border mb-4">
                <div className="flex gap-4 items-center">
                  <select
                    value={color.color_id}
                    onChange={(e) => {
                      const updated = [...formData.colors];
                      updated[i].color_id = e.target.value;
                      setFormData({ ...formData, colors: updated });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Color</option>
                    {colorsList.map((c) => (
                      <option key={c.color_id} value={c.color_id}>
                        {c.color_name}
                      </option>
                    ))}
                  </select>
                  <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded">
                    Upload Images
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        const updated = [...formData.colors];
                        updated[i].images = [...updated[i].images, ...files];
                        setFormData({ ...formData, colors: updated });
                        setMediaPreviews((prev) => {
                          const newPreviews = [...prev];
                          newPreviews[i] = [
                            ...(newPreviews[i] || []),
                            ...files.map((file) => URL.createObjectURL(file)),
                          ];
                          return newPreviews;
                        });
                      }}
                    />
                  </label>
                  {formData.colors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          colors: prev.colors.filter((_, idx) => idx !== i),
                        }));
                      }}
                      className="text-red-600"
                    >
                      <Trash2 />
                    </button>
                  )}
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {existingMedia[i]?.images?.map((img) => (
                    <div key={img.image_id} className="relative">
                      <img
                        src={`${ApiURL}/assets/Products/${img.image_url}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setDeletedMediaIds((prev) => [...prev, img.image_id]);
                          setExistingMedia((prev) => {
                            const updated = [...prev];
                            updated[i].images = updated[i].images.filter(
                              (x) => x.image_id !== img.image_id
                            );
                            return updated;
                          });
                        }}
                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  {mediaPreviews[i]?.map((preview, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={preview}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => {
                            const updated = [...prev.colors];
                            updated[i].images = updated[i].images.filter(
                              (_, index) => index !== idx
                            );
                            return { ...prev, colors: updated };
                          });
                          setMediaPreviews((prev) => {
                            const updated = [...prev];
                            updated[i] = updated[i].filter(
                              (_, index) => index !== idx
                            );
                            return updated;
                          });
                        }}
                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  colors: [...prev.colors, { color_id: "", images: [] }],
                }))
              }
              className="text-blue-600 flex items-center gap-2"
            >
              <PlusCircle /> Add Color
            </button>
          </div>

          {/* Sizes Section */}
          {formData.cate_id && sizesList.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Sizes</h3>
              {formData.sizes.map((size, i) => (
                <div key={i} className="flex gap-4 mb-3 items-center">
                  <select
                    value={size.size_id}
                    onChange={(e) => {
                      const updated = [...formData.sizes];
                      updated[i].size_id = e.target.value;
                      setFormData({ ...formData, sizes: updated });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Size</option>
                    {sizesList.map((s) => (
                      <option key={s.size_id} value={s.size_id}>
                        {s.size_name}
                      </option>
                    ))}
                  </select>
                  {formData.sizes.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          sizes: prev.sizes.filter((_, idx) => idx !== i),
                        }))
                      }
                      className="text-red-600"
                    >
                      <Trash2 />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    sizes: [...prev.sizes, { size_id: "" }],
                  }))
                }
                className="text-blue-600 flex items-center gap-2"
              >
                <PlusCircle /> Add Size
              </button>
            </div>
          )}

          {/* Stock Section */}
          {formData.colors.some(c => c.color_id) && (
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-green-800 mb-6">Stock Quantity</h3>

              {hasSelectedSizes ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-green-100">
                        <th className="border border-green-400 px-6 py-4 text-left">Size → Color ↓</th>
                        {formData.colors.filter(c => c.color_id).map((color) => {
                          const name = colorsList.find(c => c.color_id == color.color_id)?.color_name || "Color";
                          return <th key={color.color_id} className="border border-green-400 px-6 py-4 text-center">{name}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {formData.sizes.filter(s => s.size_id).map((size) => {
                        const sizeName = sizesList.find(s => s.size_id == size.size_id)?.size_name || "Size";
                        return (
                          <tr key={size.size_id}>
                            <td className="border border-green-400 px-6 py-4 font-semibold bg-green-100">{sizeName}</td>
                            {formData.colors.filter(c => c.color_id).map((color) => {
                              const key = `${color.color_id}-${size.size_id}`;
                              return (
                                <td key={key} className="border border-green-400 p-3 text-center">
                                  <input
                                    type="number"
                                    min="0"
                                    className="w-24 px-3 py-2 border rounded text-center font-medium"
                                    value={stockMatrix[key] ?? 0}
                                    onChange={(e) => handleStockChange(color.color_id, size.size_id, e.target.value)}
                                  />
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <p className="text-sm text-green-700 mt-4">Leave blank or 0 = Out of Stock</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.colors.filter(c => c.color_id).map((color) => {
                    const name = colorsList.find(c => c.color_id == color.color_id)?.color_name || "Color";
                    return (
                      <div key={color.color_id} className="flex items-center gap-4">
                        <label className="w-40 font-medium">{name}</label>
                        <input
                          type="number"
                          min="0"
                          className="flex-1 px-4 py-2 border rounded-lg text-center"
                          value={colorQuantities[color.color_id] ?? 0}
                          onChange={(e) => handleColorQuantityChange(color.color_id, e.target.value)}
                        />
                      </div>
                    );
                  })}
                  <p className="text-sm text-green-700">Enter quantity for each color.</p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-4 pt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-black text-white rounded-lg disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : product
                ? "Update Product + Stock"
                : "Create Product + Stock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
