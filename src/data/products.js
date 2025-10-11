import img1 from "../assets/c1.jpg";
import img2 from "../assets/c2.jpg";
import img3 from "../assets/c3.jpg";
import v1 from "../assets/v1.mp4";

const products = {
  categories: [
    {
      name: "Women",
      subcategories: [
        {
          name: "Sarees",
          products: [
            {
              id: 1,
              title: "Party Saree",
              category: "Women",
              subcategory: "Sarees",
              oldPrice: 188,
              newPrice: 132,
              discount: 30,
                sizes: ["XS", "S", "M", "L", "XL", "XXL"], // ✅ Must exist

              isNewArrival: true,
              isBestSeller: false,
              colors: [
                { name: "Gold", code: "#c2b280", image: img1 },
                { name: "Silver", code: "#C0C0C0", image: img2 },
              ],
              video: v1, // Added video field
            },
          ],
        },
        {
          name: "Kurtis",
          products: [
            {
              id: 2,
              title: "Cotton Kurti",
              category: "Women",
              subcategory: "Kurtis",
              oldPrice: 99,
              newPrice: 75,
              discount: 25,
              isNewArrival: true,
              isBestSeller: false,
              colors: [
                { name: "Green", code: "#00ff00", image: img1 },
                { name: "Pink", code: "#ff69b4", image: img2 },
              ],
            },
          ],
        },
        {
          name: "Lehengas",
          products: [
            {
              id: 3,
              title: "Bridal Lehenga",
              category: "Women",
              subcategory: "Lehengas",
              oldPrice: 250,
              newPrice: 200,
              discount: 20,
              isNewArrival: true,
              isBestSeller: false,
              colors: [
                { name: "Purple", code: "#800080", image: img3 },
                { name: "Red", code: "#ff0000", image: img2 },
              ],
            },
          ],
        },
        {
          name: "Sarees",
          products: [
            {
              id: 4,
              title: "Party Saree",
              category: "Women",
              subcategory: "Sarees",
              oldPrice: 188,
              newPrice: 132,
              discount: 30,
               isNewArrival: true,
              isBestSeller: false,
              colors: [
                { name: "Gold", code: "#c2b280", image: img1 },
                { name: "Silver", code: "#C0C0C0", image: img2 },
              ],
            },
          ],
        },
        {
          name: "Kurtis",
          products: [
            {
              id: 5,
              title: "Cotton Kurti",
              category: "Women",
              subcategory: "Kurtis",
              oldPrice: 99,
              newPrice: 75,
              discount: 25,
               isNewArrival: true,
              isBestSeller: false,
              colors: [
                { name: "Green", code: "#00ff00", image: img1 },
                { name: "Pink", code: "#ff69b4", image: img2 },
              ],
            },
          ],
        },
        {
          name: "Lehengas",
          products: [
            {
              id: 6,
              title: "Bridal Lehenga",
              category: "Women",
              subcategory: "Lehengas",
              oldPrice: 250,
              newPrice: 200,
              discount: 20,
              isNewArrival: true,
              isBestSeller: false,
              colors: [
                { name: "Purple", code: "#800080", image: img3 },
                { name: "Red", code: "#ff0000", image: img2 },
              ],
            },
          ],
        },
        {
          name: "Sarees",
          products: [
            {
              id: 7,
              title: "Party Saree",
              category: "Women",
              subcategory: "Sarees",
              oldPrice: 188,
              newPrice: 132,
              discount: 30,
              isNewArrival: true,
              isBestSeller: false,
              colors: [
                { name: "Gold", code: "#c2b280", image: img1 },
                { name: "Silver", code: "#C0C0C0", image: img2 },
              ],
            },
          ],
        },
        {
          name: "Kurtis",
          products: [
            {
              id: 8,
              title: "Cotton Kurti",
              category: "Women",
              subcategory: "Kurtis",
              oldPrice: 99,
              newPrice: 75,
              discount: 25,
              isNewArrival: true,
              isBestSeller: false,
              colors: [
                { name: "Green", code: "#00ff00", image: img1 },
                { name: "Pink", code: "#ff69b4", image: img2 },
              ],
            },
          ],
        },
        {
          name: "Lehengas",
          products: [
            {
              id: 9,
              title: "Bridal Lehenga",
              category: "Women",
              subcategory: "Lehengas",
              oldPrice: 250,
              newPrice: 200,
              discount: 20,
              isNewArrival: false,
              isBestSeller: true,
              colors: [
                { name: "Purple", code: "#800080", image: img3 },
                { name: "Red", code: "#ff0000", image: img2 },
              ],
            },
          ],
        },
        {
          name: "Sarees",
          products: [
            {
              id: 10,
              title: "Party Saree",
              category: "Women",
              subcategory: "Sarees",
              oldPrice: 188,
              newPrice: 132,
              discount: 30,
              isNewArrival: false,
              isBestSeller: true,
              colors: [
                { name: "Gold", code: "#c2b280", image: img1 },
                { name: "Silver", code: "#C0C0C0", image: img2 },
              ],
            },
          ],
        },
        {
          name: "Kurtis",
          products: [
            {
              id: 11,
              title: "Cotton Kurti",
              category: "Women",
              subcategory: "Kurtis",
              oldPrice: 99,
              newPrice: 75,
              discount: 25,
              isNewArrival: false,
              isBestSeller: true,
              colors: [
                { name: "Green", code: "#00ff00", image: img1 },
                { name: "Pink", code: "#ff69b4", image: img2 },
              ],
            },
          ],
        },
        {
          name: "Lehengas",
          products: [
            {
              id: 12,
              title: "Bridal Lehenga",
              category: "Women",
              subcategory: "Lehengas",
              oldPrice: 250,
              newPrice: 200,
              discount: 20,
              isNewArrival: false,
              isBestSeller: true,
              colors: [
                { name: "Purple", code: "#800080", image: img3 },
                { name: "Red", code: "#ff0000", image: img2 },
              ],
            },
          ],
        },
         {
          name: "Lehengas",
          products: [
            {
              id: 13,
              title: "Bridal Lehenga",
              category: "Women",
              subcategory: "Lehengas",
              oldPrice: 250,
              newPrice: 200,
              discount: 20,
             isNewArrival: false,
              isBestSeller: true,
              colors: [
                { name: "Purple", code: "#800080", image: img3 },
                { name: "Red", code: "#ff0000", image: img2 },
              ],
            },
          ],
        },
         {
          name: "Lehengas",
          products: [
            {
              id: 14,
              title: "Bridal Lehenga",
              category: "Women",
              subcategory: "Lehengas",
              oldPrice: 250,
              newPrice: 200,
              discount: 20,
             isNewArrival: false,
              isBestSeller: true,
              colors: [
                { name: "Purple", code: "#800080", image: img3 },
                { name: "Red", code: "#ff0000", image: img2 },
              ],
            },
          ],
        },
         {
          name: "Lehengas",
          products: [
            {
              id: 15,
              title: "Bridal Lehenga",
              category: "Women",
              subcategory: "Lehengas",
              oldPrice: 250,
              newPrice: 200,
              discount: 20,
             isNewArrival: false,
              isBestSeller: true,
              colors: [
                { name: "Purple", code: "#800080", image: img3 },
                { name: "Red", code: "#ff0000", image: img2 },
              ],
            },
          ],
        },

      ],
    },
    // Add more main categories like Men, Kids, etc., if needed
  ],

  // 🔄 Flattened lists for easy UI display
  newArrivals: [],
  bestSeller: [],
};

// 🔄 Auto-populate newArrivals and bestSeller arrays
products.categories.forEach((category) => {
  category.subcategories.forEach((subcategory) => {
    subcategory.products.forEach((product) => {
      if (product.isNewArrival) {
        products.newArrivals.push(product);
      }
      if (product.isBestSeller) {
        products.bestSeller.push(product);
      }
    });
  });
});

export default products;
