import React, { useState } from "react";
import axios from "../api/tmdb";

const Home = () => {
  const [cat, setCat] = useState([]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("/fact");

      setCat(res.data.fact);
    } catch (err) {
      console.log("Error fetching cat fact:", err);
    }
  };

  return (
    <>
      <div>
        <button
          className=" bg-black text-white rounded-lg p-2"
          onClick={handleClick}
        >
          Get
        </button>
        <p>{cat}</p>
        {/* <ul>
          {cat.length > 0 ? (
            cat.map((fact, id) => <li key={id}>{fact.fact}</li>)
          ) : (
            <p>No Fact</p>
          )}
        </ul> */}
      </div>
    </>
  );
};

export default Home;
