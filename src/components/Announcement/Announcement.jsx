import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../Urls";

function Announcement(props) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [image, setImage] = useState(null);
  const { subId } = useParams();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", inputValue); // Add the text content
    if (image) {
      formData.append("file", image); // Add the file if one was selected
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post(`${baseUrl}/post/${subId}`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data", // Important: Set the content type to multipart/form-data
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error uploading:", error.response || error.message);
    }
  };

  return (
    <div className="w-full bg-white rounded-md overflow-hidden">
      <div className="p-6">
        <div>
          {showInput ? (
            <div>
              <textarea
                id="announcement-input"
                className="w-full h-40  border border-gray-300 rounded-md focus:outline-none resize-none"
                placeholder="Announce Something to class"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              ></textarea>
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between">
                <input
                  onChange={handleChange}
                  type="file"
                  className="w-full sm:w-auto p-2 border border-gray-300 rounded-md mb-2 sm:mb-0"
                />
                <div className="flex">
                  <button
                    onClick={() => setShowInput(false)}
                    className="px-4 py-2 mr-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpload}
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="cursor-pointer" onClick={() => setShowInput(true)}>
              <div className="h-20 w-full rounded-lg bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">
                  Announce Something to class
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Announcement;
