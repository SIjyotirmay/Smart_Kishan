import { useEffect, useState } from "react";
import UserNavbar from "../../inc/UserNavbar";
import "./market.css";

function Market() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/market/all")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="market-container">
      <UserNavbar />
      <div className="market-header">
        <h1>Smart Marketplace</h1>
        <p>
          Buy, sell, and track agricultural products with real-time market data
        </p>

        <div className="market-tabs">
          <button className="active-tab">Buy Products</button>
          <button>Sell Products</button>
          <button>Mandi Prices</button>
        </div>

        <div className="market-search-filter">
          <input type="text" placeholder="Search products..." />
          <button className="filter-btn">🔍 Filter</button>
        </div>
      </div>

      <div className="product-grid">
        {products.map((p, idx) => (
          <div className="product-card" key={idx}>
            <img
              src={`http://localhost:2000/uploads/${p.image}`}
              alt={p.title}
              onError={(e) => (e.target.style.display = "none")}
            />
            <div className="product-details">
              <h3>{p.title}</h3>
              {p.tag && <span className="tag">{p.tag}</span>}
              <p className="vendor">{p.vendor}</p>
              <p className="location">📍 {p.location}</p>
              <p className="price">₹{p.price} <span>per quintal</span></p>
              <p className={`trend ${p.trend > 0 ? "up" : "down"}`}>
                {p.trend > 0 ? "▲" : "▼"} {Math.abs(p.trend)}%
              </p>
              <button className="cart-btn">🛒 Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Market;
