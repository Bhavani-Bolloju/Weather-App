import React from "react";
import { format } from "date-fns";

function TimeFormat(props) {
  const time = new Date(props.date * 1000);
  const formatTime = format(time, "hh:mm aaaa");
  const formatDate = format(time, "PPpp");
  return (
    <div className="flex flex-col">
      {/* <span>{formatTime}</span> */}
      <span>{formatDate}</span>
    </div>
  );
}

export default TimeFormat;
