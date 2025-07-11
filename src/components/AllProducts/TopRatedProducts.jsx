import React from "react";
import { Products } from "./Allproducts";
import { Link } from "react-router-dom";

const TopRatedProducts = () => {
  const topRated = [...Products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const handleBuyNow = (product) => {
    localStorage.setItem("buyNowProduct", JSON.stringify({ ...product, quantity: 1 }));
    localStorage.setItem("checkoutType", "buyNow");
    localStorage.removeItem("cart");
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("checkoutType", "cart");
    localStorage.removeItem("buyNowProduct");
  };

  return (
    <div className="px-6 py-6 sm:px-6 lg:px-0 dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
        Top Rated Products
      </h2>

      {/* Grid layout — fully responsive */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {topRated.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 sm:h-32 object-cover rounded-md"
            />

            <h3 className="mt-3 text-sm sm:text-base font-semibold line-clamp-1">
              {product.name}
            </h3>
            <p className="text-yellow-500 text-sm">
              Rating: {product.rating} ⭐
            </p>
            <p className="text-green-600 font-bold text-sm sm:text-base">
              Rs. {product.price}
            </p>

            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <Link to="/order" className="flex-1">
                <button
                  onClick={() => handleBuyNow(product)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm rounded"
                >
                  Buy Now
                </button>
              </Link>
              <Link to="/cart" className="flex-1">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 text-sm rounded"
                >
                  Add to Cart
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedProducts;
