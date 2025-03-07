"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

const Card = ({ title, icon, children }) => (
  <div className="bg-[#09090B] text-white p-4 rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-sm font-medium">{title}</h3>
      {icon && <div className="h-4 w-4 text-gray-400">{icon}</div>}
    </div>
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
    {children}
  </span>
);

const Progress = ({ value }) => (
  <div className="w-full bg-gray-800 h-2 rounded-md overflow-hidden mt-2">
    <div
      className="h-2 bg-green-500"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

const getDemandLevelColor = (level) => {
  switch (level.toLowerCase()) {
    case "high":
      return "bg-green-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getMarketOutlookInfo = (outlook) => {
  switch (outlook.toLowerCase()) {
    case "positive":
      return { icon: <TrendingUp />, color: "text-green-500" };
    case "neutral":
      return { icon: <LineChart />, color: "text-yellow-500" };
    case "negative":
      return { icon: <TrendingDown />, color: "text-red-500" };
    default:
      return { icon: <LineChart />, color: "text-gray-500" };
  }
};

const DashboardView = ({ insights }) => {
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const outlookInfo = getMarketOutlookInfo(insights.marketOutlook);
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(new Date(insights.nextUpdate), {
    addSuffix: true,
  });

  return (
    <div className="mt-20">
      <Badge>Last updated: {lastUpdatedDate}</Badge>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Market Outlook" icon={outlookInfo.icon}>
          <div className={`text-2xl font-bold ${outlookInfo.color}`}>
            {insights.marketOutlook}
          </div>
          <p className="text-xs text-gray-400">Next update {nextUpdateDistance}</p>
        </Card>

        <Card title="Industry Growth" icon={<TrendingUp />}>
          <div className="text-2xl font-bold">{insights.growthRate.toFixed(1)}%</div>
          <Progress value={insights.growthRate} />
        </Card>

        <Card title="Demand Level" icon={<BriefcaseIcon />}>
          <div className="text-2xl font-bold">{insights.demandLevel}</div>
          <div className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(insights.demandLevel)}`} />
        </Card>

        <Card title="Top Skills" icon={<Brain />}>
          <div className="flex flex-wrap gap-1">
            {insights.topSkills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Salary Ranges by Role">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
              <Bar dataKey="median" fill="#64748b" name="Median Salary (K)" />
              <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Key Industry Trends">
          <ul className="space-y-4">
            {insights.keyTrends.map((trend, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-green-500" />
                <span>{trend}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Recommended Skills">
          <div className="flex flex-wrap gap-2">
            {insights.recommendedSkills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
