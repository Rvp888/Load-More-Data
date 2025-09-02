import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

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
        setProducts(result.products);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    // Side effects or data fetching logic can go here
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading Data... Please Wait!</div>;
  }

  return (
    <div className="container">
      <div>
        {products && products.length
          ? products.map((product) => {
              return (
                <div key={product.id}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    width={100}
                  />
                  <p>{product.title}</p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default App;
