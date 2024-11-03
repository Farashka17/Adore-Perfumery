import React from "react";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import { useState } from "react";
import Singlebrand from "../SingleBrand";

const FragranceFamilyComponent = () => {
  const [brandData, setbrandData] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/brands");
        if (!response.ok) {
          console.log(`Failed to fetch categories.`);
          return;
        }

        const result = await response.json();
        const categories = Array.isArray(result.data) ? result.data : [];
        setbrandData(categories);
        console.log("Fetched users:", result);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  const brandDeleteHandler = async (brandId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/brands/${brandId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        console.log(`Failed to delete brand.`);
        return;
      }
      setbrandData((prevbrands) =>
        prevbrands.filter((brand) => brand._id !== brandId)
      );
    } catch (error) {
      console.log("Error deleting brand:", error);
    }
  };
  return (
    <div className="bg-gray-900 min-h-[100vh] flex flex-col p-4">
      <Link to="/addfragrancefamily">
        <button className="border-green-700 border-2 rounded-lg py-1 px-4 bg-green-800 text-white font-bold">
          Add brand
        </button>
        </Link>
        {brandData &&
          brandData.map((brand) => {
            return (
              <Singlebrand
                key={brand._id}
                name={brand.name}
                id={brand._id}
                brandPic={brand.brandPic}
                deletebrand={() =>brandDeleteHandler(brand._id)}
              />
            );
          })}
    </div>
  );
};

export default FragranceFamilyComponent;
