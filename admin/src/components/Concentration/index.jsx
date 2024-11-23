import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SingleConcentration from "../SingleConcentration";

const ConcentrationComponent = () => {
  const [concentrationData, setConcentrationData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentConcentration, setCurrentConcentration] = useState(null);
  const [newConcentrationName, setNewConcentrationName] = useState("");
  const [newDescription, setNewDescription] = useState(""); 
  const [newConcentrationPic, setNewConcentrationPic] = useState(null);

  const fetchConcentrations= async () => {
    try {
      const response = await fetch("http://localhost:3000/concentrations");
      if (!response.ok) throw new Error("Failed to fetch concentrations.");
      const result = await response.json();
      setConcentrationData(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("Error fetching concentrations:", error);
    }
  };

  useEffect(() => {
    fetchConcentrations();
  }, []);

  const concentrationDeleteHandler = async (concentrationId) => {
    try {
      const response = await fetch(`http://localhost:3000/concentrations/${concentrationId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.log("Failed to delete concentration.");
        return;
      }
      setConcentrationData((prevConcentrations) =>
        prevConcentrations.filter((concentration) => concentration._id !== concentrationId)
      );
    } catch (error) {
      console.log("Error deleting concentration:", error);
    }
  };

  const startEditHandler = (concentration) => {
    setIsEditing(true);
    setCurrentConcentration(concentration);
    setNewConcentrationName(concentration.name);
    setNewDescription(concentration.description || ""); 
    setNewConcentrationPic(null);
  };

  const concentrationEditHandler = async () => {
    if (!currentConcentration) return;

    const formData = new FormData();
    formData.append("name", newConcentrationName);
    formData.append("description", newDescription); 



    try {
      const response = await fetch(`http://localhost:3000/concentrations/${currentConcentration._id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        console.log("Failed to edit concentration. Status:", response.status);
        const errorData = await response.json();
        console.log("Error message:", errorData.message);
        return;
      }

      const updatedConcentration = await response.json();
      setConcentrationData((prevConcentrations) =>
        prevConcentrations.map((concentration) =>
            concentration._id === currentConcentration._id ? updatedConcentration : concentration
        )
      );

      setIsEditing(false);
      setCurrentConcentration(null);
    } catch (error) {
      console.log("Error editing concentration:", error);
    }
  };

  return (
    <div className="bg-pink-100 min-h-[100vh] flex flex-col p-4">
      <Link to="/addConcentration">
        <button className="border-green-700 border-2 rounded-lg py-1 px-4 bg-green-800 text-white font-bold">
          Add Concentration
        </button>
      </Link>

      {concentrationData.map((concentration) => (
        <SingleConcentration
          key={concentration._id}
          name={concentration.name}
          id={concentration._id}
          description={concentration.description} 
          concentrationPic={concentration.concentrationPic}
          deleteConcentration={() => concentrationDeleteHandler(concentration._id)}
          editConcentration={() => startEditHandler(concentration)}
        />
      ))}

      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Concentration</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={newConcentrationName}
              onChange={(e) => setNewConcentrationName(e.target.value)}
            />
            <textarea
              className="w-full p-2 border rounded mb-4"
              value={newDescription}
              placeholder="Description"
              onChange={(e) => setNewDescription(e.target.value)}
            />
          
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={concentrationEditHandler}
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

export default ConcentrationComponent;
