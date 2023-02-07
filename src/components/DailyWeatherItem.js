import React from "react";
import format from "date-fns/format";
import { motion, AnimatePresence } from "framer-motion";

import "./DailyWeatherItem.css";

function DailyWeatherItem(props) {
  const { weather, sunrise, sunset, date, temp, onExpand, isExpand } = props;

  const weekDay = new Date(date * 1000).toLocaleDateString("us-en", {
    weekday: "short",
  });
  const { icon, description } = weather[0];
  const { day, night } = temp;

  const timeFormat = function (dt) {
    return format(new Date(dt * 1000), "hh:mm aaaa");
  };

  const TempFormat = function (props) {
    return (
      <>
        <span>{props.day}</span>
        <span>&deg;C</span>
      </>
    );
  };

  return (
    <div
      className="flex rounded-lg md:py-8 py-8 px-8   bg-slate-50/10 gap-5"
      onClick={onExpand}
    >
      <div className="flex flex-col text-center leading-none md:min-w-[130px] min-w-[100px] cursor-pointer ">
        <div className="bg-[#0f3443df]/70 self-center py-1.5 px-3 rounded-lg">
          {weekDay}
        </div>
        <div className="-mt-4 ">
          <img
            className="object-cover m-auto"
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description + "image"}
          />
        </div>
        <div className="-mt-4">{description}</div>
      </div>

      <AnimatePresence>
        {isExpand && (
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>
              Day: <TempFormat day={day} />
            </div>
            <div>
              Night: <TempFormat day={night} />
            </div>
            <div>Sunrise: {timeFormat(sunrise)}</div>
            <div>Sunset: {timeFormat(sunset)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DailyWeatherItem;
