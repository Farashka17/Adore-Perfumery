import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SingleVolume from "../SingleVolume";

const VolumeComponent = () => {
  const [volumeData, setVolumeData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(null);
  const [newVolumeName, setNewVolumeName] = useState("");

  const fetchVolumes = async () => {
    try {
      const response = await fetch("http://localhost:3000/volumes");
      if (!response.ok) throw new Error("Failed to fetch volumes.");
      const result = await response.json();
      setVolumeData(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("Error fetching volumes:", error);
    }
  };

  useEffect(() => {
    fetchVolumes();
  }, []);

  const volumeDeleteHandler = async (volumeId) => {
    try {
      const response = await fetch(`http://localhost:3000/volumes/${volumeId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.log("Failed to delete volume.");
        return;
      }
      setVolumeData((prevVolumes) =>
        prevVolumes.filter((volume) => volume._id !== volumeId)
      );
    } catch (error) {
      console.log("Error deleting volume:", error);
    }
  };

  const startEditHandler = (volume) => {
    setIsEditing(true);
    setCurrentVolume(volume);
    setNewVolumeName(volume.name);
   
  };

  const volumeEditHandler = async () => {
    if (!currentVolume) return;

    const formData = new FormData();
    formData.append("name", newVolumeName);
 

    try {
      const response = await fetch(`http://localhost:3000/volumes/${currentVolume._id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        console.log("Failed to edit volume. Status:", response.status);
        const errorData = await response.json();
        console.log("Error message:", errorData.message);
        return;
      }

      const updatedVolume = await response.json();
      setVolumeData((prevVolumes) =>
        prevVolumes.map((volume) =>
          volume._id === currentVolume._id ? updatedVolume : volume
        )
      );

      setIsEditing(false);
      setCurrentVolume(null);
    } catch (error) {
      console.log("Error editing volume:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-[100vh] flex flex-col p-4">
      <Link to="/addVolume">
        <button className="border-green-700 border-2 rounded-lg py-1 px-4 bg-green-800 text-white font-bold">
          Add Volume
        </button>
      </Link>

      {volumeData.map((volume) => (
        <SingleVolume
          key={volume._id}
          name={volume.name}
          id={volume._id}
          deleteVolume={() => volumeDeleteHandler(volume._id)}
          editVolume={() => startEditHandler(volume)}
        />
      ))}

      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Volume</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={newVolumeName}
              onChange={(e) => setNewVolumeName(e.target.value)}
            />
          
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={volumeEditHandler}
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

export default VolumeComponent;
