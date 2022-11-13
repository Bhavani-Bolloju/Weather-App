import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  LabelList,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const LabelListStyles = (props) => {
  const { x, y, value } = props;

  return (
    <g>
      <text
        x={x}
        y={y}
        fill="#e4dede90"
        fontSize="13px"
        fontFamily="Helvetica Neue"
        textAnchor="middle"
        dominantBaseline="top"
      >
        {`${value}°C`}
      </text>
    </g>
  );
};

function CustomizedToolTip({ active, payload, label }) {
  if (active) {
    return (
      <div className="bg-slate-300/20 text-2xl text-center p-2">
        <div>
          <span>{label}</span>
        </div>
        <div>
          <span className="value">{payload[0].value}</span>
          <span className="Celsius">
            <sup>&#x2103;</sup>
          </span>
        </div>
      </div>
    );
  }
}

const Graph = function (props) {
  const totalTemp = props?.data?.map((item) => item.temp);

  const max = totalTemp && Math.ceil(Math.max(...totalTemp)) + 1;
  const min = totalTemp && Math.ceil(Math.min(...totalTemp)) - 2;

  return (
    <ResponsiveContainer width="100%" height={330}>
      <AreaChart data={props.data}>
        <defs>
          <linearGradient id="fillColor" x1="1" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0f3443" stopOpacity={0.8} />
            <stop offset="60%" stopColor="#0f3443" stopOpacity={0.4} />
            <stop offset="90%" stopColor="#0f3443" stopOpacity={0.09} />
          </linearGradient>
        </defs>
        <Area
          dataKey="temp"
          isAnimationActive={false}
          fill="url(#fillColor)"
          strokeWidth={2}
          stroke="#0f3443"
          fillOpacity={0.8}
        >
          <LabelList
            dataKey="temp"
            position="top"
            angle="95"
            content={<LabelListStyles />}
          />
        </Area>
        <XAxis
          axisLine={false}
          dataKey="date"
          tick={{ fill: "#fff9", fontSize: "15px", wordWrap: "break-word" }}
          interval={0}
          // interval="preserveStartEnd"
          tickLine={false}
          minTickGap={200}
        ></XAxis>
        <YAxis
          dataKey="temp"
          domain={[min, max]}
          tickLine={false}
          axisLine={false}
          minTickGap={2}
          interval="preserveStartEnd"
          tickSize={2}
          tick={{ fill: "transparent" }}
        />
        <Tooltip content={<CustomizedToolTip />} />
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          opacity={0.1}
          stroke="#fff"
          strokeWidth={0.5}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Graph;
