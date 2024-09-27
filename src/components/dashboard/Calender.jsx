import React from "react";
import { generateDate, months } from "./util/calendar";
import cn from "./util/cn";
import dayjs from "dayjs";
import { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

function Calender() {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  return (
    <div className="w-full h-full flex justify-center mx-auto  ">
      <div className=" w-full h-full border-2  rounded-md border-#f1eefe p-4">
        <div className="flex justify-between  ">
          <h1 className="font-bold text-xs">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex items-center gap-1">
            <GrFormPrevious
              className=" w-5/12 h-5/12 cursor-pointer"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className="cursor-pointer"
              style={{ fontSize: "0.6rem" }}
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className=" w-5/12 h-5/12 cursor-pointer"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="w-full mt-6 grid grid-cols-7 text-gray-700 font-semibold">
          {days.map((day, index) => {
            return (
              <h1
                className=" h-6 grid place-content-center text-xs"
                key={index}
              >
                {day}
              </h1>
            );
          })}
        </div>
        <div className="w-full grid grid-cols-7">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    currentMonth ? "" : "text-gray-300",
                    today ? "bg-[#45539d] text-white" : "",
                    selectDate.toDate().toDateString() ===
                      date.toDate().toDateString()
                      ? "bg-black text-white"
                      : "",
                    "grid max-w-full place-content-center hover:bg-black hover:text-white transition-all cursor-pointer",
                    "h-6 border grid place-content-center p-0 text-xs"
                  )}
                >
                  <h1
                    onClick={() => {
                      setSelectDate(date);
                    }}
                  >
                    {date.date()}
                  </h1>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default Calender;
