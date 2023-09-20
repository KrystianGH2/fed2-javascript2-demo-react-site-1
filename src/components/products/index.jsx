/** @module productsHOC component */

import { useEffect, useState } from "react";
// import { useAllUsers } from "../../lib/my-api";
import ProductsUI from "./ui";

/**
 * A product sold on the website which end-users can add their Cart.
 * @typedef  {object} Product
 * @property {string} id - an ID.
 * @property {string} title - name of the product.
 * @property {string} description - description of the product.
 * @property {string} price - price of the product.
 * @property {Number} discountPercentage - discountPercentage on the product price.
 * @property {Number} rating - rating of the product.
 * @property {Number} stock - Amount avalible in stock.
 * @property {String} brand - brand of the product.
 * @property {string} category - category of the product.
 * @property {string} thumbnail - URL of the product image.
 * @property {string[]} images - URLs of the product images.
 */

/**
 * This is a higher-order component that fetches the list of products and displays them.
 * @returns {object} the list of products to display
 * @requires module:productsUI
 */
export default function Products() {
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  /**
   * @typedef {object} Data
   * @property {Product[]} products
   * @property {Number} total=100
   * @property {Number} skip=0
   * @property {Number} limit=10
   */
  /** @type {[Data, React.Dispatch<Data>]} */
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((result) => {
        setStatus("success");
        setData(result);
      })
      .catch((err) => {
        setStatus("error");
        setError(err);
      });
  }, []);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error?.message}</span>;
  }

  return <ProductsUI products={data?.products} />;
}
