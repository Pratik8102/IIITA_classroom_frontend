import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../Urls";

function ViewResults() {
  const { subId } = useParams();
  const [results, setResults] = useState({});

  const [max, setMax] = useState({});
  const examType = window.location.pathname.includes("midSem")
    ? "midSem"
    : "endSem";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            `${baseUrl}/results/${subId}/${examType}`,
            {
              headers: {
                authorization: token,
              },
            }
          );
          const res = {
            review: response.data.studentMarks.review,
            quiz: response.data.studentMarks.quiz,
            assignment: response.data.studentMarks.assignment,
          };

          const mx =
            examType === "midSem"
              ? response.data.courseMarks.midSemWeightage
                ? {
                    review: response.data.courseMarks.midSemWeightage.review,
                    quiz: response.data.courseMarks.midSemWeightage.quiz,
                    assignment:
                      response.data.courseMarks.midSemWeightage.assignment,
                  }
                : {
                    review: 0,
                    quiz: 0,
                    assignment: 0,
                  }
              : response.data.courseMarks.midSemWeightage
              ? {
                  review: response.data.courseMarks.endSemWeightage.review,
                  quiz: response.data.courseMarks.endSemWeightage.quiz,
                  assignment:
                    response.data.courseMarks.endSemWeightage.assignment,
                }
              : {
                  review: 0,
                  quiz: 0,
                  assignment: 0,
                };

          setMax(mx);

          setResults(res);
        } else {
          console.error("Token not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [subId, examType]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Results for {subId}</h1>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-2">Review Test</h2>
        <p className="text-lg">Marks: {results.review}/{max.review}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 mt-4">
        <h2 className="text-xl font-semibold mb-2">Quiz</h2>
        <p className="text-lg">Marks: {results.quiz}/{max.quiz}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 mt-4">
        <h2 className="text-xl font-semibold mb-2">Assignment</h2>
        <p className="text-lg">Marks: {results.assignment}/{max.assignment}</p>
      </div>
    </div>
  );
}

export default ViewResults;
