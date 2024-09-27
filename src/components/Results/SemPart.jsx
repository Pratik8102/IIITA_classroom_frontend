import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const role = localStorage.getItem("role");

function SemPart() {
  const [url, setUrl] = useState();
  const { subId } = useParams();

  useEffect(() => {
    role === "Professor" ? setUrl("Assign") : setUrl("View");
  }, []);

  const handleButtonClick = (examType) => {
    const route = `/results/${subId}/${examType}`;
    window.location.href = route;
  };

  return (
    <div className="flex flex-col w-full sm:w-1/2 justify-start h-screen p-10">
      <div className="mb-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4 flex flex-col items-start gap-8 justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Midsem exams</h2>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => handleButtonClick("midSem")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md mr-4"
            >
              {url} Marks
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start gap-8 justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Endsem exams</h2>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => handleButtonClick("endSem")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md mr-4"
            >
              {url} Marks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SemPart;
