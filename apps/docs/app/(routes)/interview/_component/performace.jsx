"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <div className=" p-6 shadow-md rounded-lg mt-8">
      <h2 className="text-4xl md:text-4xl font-bold text-white">
        Performance Trend
      </h2>
      <p className="text-gray-600">Your quiz scores over time</p>

      <div className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  return (
                    <div className="bg-white border rounded-lg p-2 shadow-md">
                      <p className="text-sm font-medium">
                        Score: {payload[0].value}%
                      </p>
                      <p className="text-xs text-gray-600">
                        {payload[0].payload.date}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
