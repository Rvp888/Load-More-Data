import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      const result = await response.json();
      console.log(result);
      if (result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    // Side effects or data fetching logic can go here
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (products.length !== 0 && imagesLoaded === products.length) {
      setTimeout(() => {
        setLoading(false);
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 300); // delay 100ms to allow paint/layout
    }
  }, [imagesLoaded]);

  useEffect(() => {
    if (products && products.length === 100) setDisableButton(true);
  }, [products]);

  return (
    <div className="container">
      <h2>Products Page</h2>
      <div className="product-container">
        {products && products.length
          ? products.map((product) => {
              return (
                <div key={product.id} className="product">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    width={100}
                    onLoad={() => setImagesLoaded((l) => l + 1)}
                  />
                  <p>{product.title}</p>
                </div>
              );
            })
          : null}
      </div>

      <div className="button-container">
        {loading ? (
          <div>Loading data please wait...</div>
        ) : (
          <button disabled={disableButton} onClick={() => setCount(count + 1)}>
            Load More Products
          </button>
        )}
        {disableButton && (
          <p className="message">You have reached to 100 products!</p>
        )}
      </div>
    </div>
  );
}

export default App;
