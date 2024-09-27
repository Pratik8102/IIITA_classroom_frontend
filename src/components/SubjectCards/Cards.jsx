
import { ChevronRight } from "lucide-react";
import ImageCard from "./ImageCard";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";


function Cards() {
  const {data} = useContext(UserContext)
  // console.log(data)
  return (
    <div className="flex flex-wrap mt-6 ">
      {data.map((d) => (
        <div key={d.course_name} className="p-4 w-full md:w-1/3">
          <Link to={`subject/${d.course}`}>
            <ImageCard imgSrc={d.Image}>
              <div className="flex flex-col justify-between rounded-lg h-full">
                <div className="flex flex-col overflow-hidden mb-4">
                  <h2 className=" text-white text-base md:text-lg font-bold ">
                    {d.course_name}
                  </h2>
                  <p className="hidden md:flex  text-sm text-gray-300">
                    {d.course}
                  </p>
                </div>
                <div className="flex overflow-hidden">
                  <div className=" text-white inline-flex items-center mr-1">
                    {d.proffesor}
                  </div>
                  <div className=" text-white inline-flex items-center">
                    <ChevronRight />
                  </div>
                </div>
              </div>
            </ImageCard>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Cards;
