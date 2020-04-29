import React, { useState, useEffect } from "react";
import { drinkData } from "../data.json";
import { Link } from "react-router-dom";

const Data = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    document.body.style.overflow = "auto";
    const filt = JSON.parse(localStorage.getItem("filteredItems"));
    const x = filt.map((ele) => ele.ingred);
    let l = [];
    drinkData.forEach((drink) => {
      const newIngreds = drink.ingredients.map((d) => d.toUpperCase());
      const d = newIngreds.every((i) => x.indexOf(i) >= 0);
      if (d === true) {
        l.push(drink);
      }
    });

    setData(l);
  }, []);

  return (
    <div className="Data">
      <Link
        to={{
          pathname: "/homepage",
        }}
      ></Link>
      <h1>Here Are The Drinks You Can Make</h1>
      <div id="galleryContainer">
        {data.map((d) => (
          <div className="gallery">
            <img src={d.image} alt=""></img>
            <Link
              id="link"
              to={{
                pathname: "/item",
                data: d,
              }}
            >
              <div>{d.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;
