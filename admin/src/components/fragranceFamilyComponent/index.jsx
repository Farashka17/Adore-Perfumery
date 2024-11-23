import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SingleFragranceFamily from "../SingleFragrancyFamily";

const FragranceFamilyComponent = () => {
  const [fragranceData, setFragranceData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFragrance, setCurrentFragrance] = useState(null);
  const [newFragranceName, setNewFragranceName] = useState("");
  const [newDescription, setNewDescription] = useState(""); 
  const [newFragrancePic, setNewFragrancePic] = useState(null);

  const fetchFragrances = async () => {
    try {
      const response = await fetch("http://localhost:3000/fragranceFamily");
      if (!response.ok) throw new Error("Failed to fetch fragrances.");
      const result = await response.json();
      setFragranceData(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("Error fetching fragrances:", error);
    }
  };

  useEffect(() => {
    fetchFragrances();
  }, []);

  const fragranceDeleteHandler = async (fragranceId) => {
    try {
      const response = await fetch(`http://localhost:3000/fragranceFamily/${fragranceId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.log("Failed to delete fragrance.");
        return;
      }
      setFragranceData((prevFragrances) =>
        prevFragrances.filter((fragrance) => fragrance._id !== fragranceId)
      );
    } catch (error) {
      console.log("Error deleting fragrance:", error);
    }
  };

  const startEditHandler = (fragrance) => {
    setIsEditing(true);
    setCurrentFragrance(fragrance);
    setNewFragranceName(fragrance.name);
    setNewDescription(fragrance.description || ""); 
    setNewFragrancePic(null);
  };

  const fragranceEditHandler = async () => {
    if (!currentFragrance) return;

    const formData = new FormData();
    formData.append("name", newFragranceName);
    formData.append("description", newDescription); 

    if (newFragrancePic) {
      const fragrancePicUrl = await uploadImage(newFragrancePic);
      if (!fragrancePicUrl) {
        alert("Image upload failed. Please try again.");
        return;
      }
      formData.append("fragrancePic", fragrancePicUrl);
    }

    try {
      const response = await fetch(`http://localhost:3000/fragranceFamily/${currentFragrance._id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        console.log("Failed to edit fragrance. Status:", response.status);
        const errorData = await response.json();
        console.log("Error message:", errorData.message);
        return;
      }

      const updatedFragrance = await response.json();
      setFragranceData((prevFragrances) =>
        prevFragrances.map((fragrance) =>
          fragrance._id === currentFragrance._id ? updatedFragrance : fragrance
        )
      );

      setIsEditing(false);
      setCurrentFragrance(null);
    } catch (error) {
      console.log("Error editing fragrance:", error);
    }
  };

  return (
    <div className="bg-pink-100 min-h-[100vh] flex flex-col p-4">
      <Link to="/addfragrancefamily">
        <button className="border-green-700 border-2 rounded-lg py-1 px-4 bg-green-800 text-white font-bold">
          Add Fragrance Family
        </button>
      </Link>

      {fragranceData.map((fragrance) => (
        <SingleFragranceFamily
          key={fragrance._id}
          name={fragrance.name}
          id={fragrance._id}
          description={fragrance.description} 
          fragrancePic={fragrance.fragrancePic}
          deleteFragrance={() => fragranceDeleteHandler(fragrance._id)}
          editFragrance={() => startEditHandler(fragrance)}
        />
      ))}

      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Fragrance</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={newFragranceName}
              onChange={(e) => setNewFragranceName(e.target.value)}
            />
            <textarea
              className="w-full p-2 border rounded mb-4"
              value={newDescription}
              placeholder="Description"
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <input
              type="file"
              className="w-full p-2 border rounded mb-4"
              onChange={(e) => setNewFragrancePic(e.target.files[0])}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={fragranceEditHandler}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FragranceFamilyComponent;
