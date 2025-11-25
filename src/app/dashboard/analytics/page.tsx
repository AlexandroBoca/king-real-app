"use client";

import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useTheme } from "@/contexts/ThemeContext";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Analytics() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [isLoading, setIsLoading] = useState(true);
  const [animatedMetrics, setAnimatedMetrics] = useState({
    totalRevenue: 0,
    totalUsers: 0,
    conversionRate: 0,
    avgOrderValue: 0,
    bounceRate: 0,
    pageViews: 0,
  });

  // Animate metrics on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedMetrics({
        totalRevenue: 456789,
        totalUsers: 12847,
        conversionRate: 3.8,
        avgOrderValue: 127.50,
        bounceRate: 42.3,
        pageViews: 89234,
      });
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const periods = [
    { id: "day", name: "Today" },
    { id: "week", name: "This Week" },
    { id: "month", name: "This Month" },
    { id: "quarter", name: "This Quarter" },
    { id: "year", name: "This Year" },
  ];

  const metrics = [
    {
      id: "revenue",
      name: "Total Revenue",
      value: `$${animatedMetrics.totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      changeType: "positive",
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      trend: [30, 45, 35, 50, 49, 60, 70, 91, 85, 100, 95, 110],
    },
    {
      id: "users",
      name: "Total Users",
      value: animatedMetrics.totalUsers.toLocaleString(),
      change: "+8.2%",
      changeType: "positive",
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      ),
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      trend: [100, 120, 115, 134, 168, 132, 200, 247, 218, 289, 267, 320],
    },
    {
      id: "conversion",
      name: "Conversion Rate",
      value: `${animatedMetrics.conversionRate}%`,
      change: "+2.1%",
      changeType: "positive",
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      ),
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      trend: [2.1, 2.3, 2.2, 2.8, 3.1, 2.9, 3.5, 3.8, 3.6, 4.1, 3.9, 4.2],
    },
    {
      id: "orderValue",
      name: "Avg Order Value",
      value: `$${animatedMetrics.avgOrderValue}`,
      change: "-1.3%",
      changeType: "negative",
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      ),
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      trend: [120, 125, 118, 132, 129, 135, 128, 131, 124, 127, 130, 128],
    },
  ];

  const trafficSources = [
    { source: "Organic Search", visitors: 4523, percentage: 38.2, color: "bg-blue-500" },
    { source: "Direct", visitors: 3210, percentage: 27.1, color: "bg-green-500" },
    { source: "Social Media", visitors: 2345, percentage: 19.8, color: "bg-purple-500" },
    { source: "Referral", visitors: 1234, percentage: 10.4, color: "bg-orange-500" },
    { source: "Email", visitors: 567, percentage: 4.8, color: "bg-pink-500" },
  ];

  const topPages = [
    { page: "/dashboard", views: 15234, bounceRate: 32.1, avgTime: "3:45" },
    { page: "/pricing", views: 8923, bounceRate: 45.2, avgTime: "2:18" },
    { page: "/features", views: 6789, bounceRate: 38.7, avgTime: "4:12" },
    { page: "/about", views: 4567, bounceRate: 52.3, avgTime: "1:56" },
    { page: "/blog", views: 3456, bounceRate: 41.8, avgTime: "5:23" },
  ];

  const devices = [
    { device: "Desktop", users: 6789, percentage: 52.8, color: "bg-indigo-500" },
    { device: "Mobile", users: 4567, percentage: 35.4, color: "bg-green-500" },
    { device: "Tablet", users: 1491, percentage: 11.6, color: "bg-purple-500" },
  ];

  const chartData = {
    revenue: [
      { month: "Jan", value: 45000, target: 50000 },
      { month: "Feb", value: 52000, target: 55000 },
      { month: "Mar", value: 48000, target: 60000 },
      { month: "Apr", value: 61000, target: 65000 },
      { month: "May", value: 58000, target: 70000 },
      { month: "Jun", value: 72000, target: 75000 },
    ],
    users: [
      { month: "Jan", value: 1200, target: 1500 },
      { month: "Feb", value: 1450, target: 1600 },
      { month: "Mar", value: 1680, target: 1800 },
      { month: "Apr", value: 1920, target: 2000 },
      { month: "May", value: 2100, target: 2200 },
      { month: "Jun", value: 2380, target: 2400 },
    ],
  };

  const getChartData = () => {
    return selectedMetric === "revenue" ? chartData.revenue : chartData.users;
  };

  const getMaxValue = () => {
    const data = getChartData();
    const allValues = data.flatMap(d => [d.value, d.target]);
    return Math.max(...allValues) * 1.2;
  };

  return (
    <ProtectedRoute>
      <DashboardLayout 
        title="Analytics" 
        subtitle="Track your performance metrics and gain insights into your business."
        actions={
          <div className="flex items-center space-x-3">
            <button className={`${theme === 'dark' ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'} px-4 py-2 rounded-lg border transition-colors duration-200`}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Report
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Custom Report
            </button>
          </div>
        }
      >
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Period Selector */}
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-4 sm:p-6`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Analytics Overview</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Monitor your key performance indicators</p>
              </div>
              <div className="flex items-center space-x-2">
                {periods.map((period) => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      selectedPeriod === period.id
                        ? theme === 'dark' ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'
                        : theme === 'dark'
                          ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {period.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {metrics.map((metric, index) => (
              <div
                key={metric.id}
                className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden group`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 ${theme === 'dark' ? '' : metric.bgColor}`}>
                      {metric.icon}
                    </div>
                    <div className={`flex items-center text-sm font-medium ${
                      metric.changeType === "positive" ? "text-green-600" : "text-red-600"
                    }`}>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={metric.changeType === "positive" ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}
                        />
                      </svg>
                      {metric.change}
                    </div>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{metric.name}</p>
                    <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} ${isLoading ? 'animate-pulse' : ''}`}>
                      {isLoading ? '---' : metric.value}
                    </p>
                  </div>
                  {/* Mini Sparkline */}
                  <div className="mt-4 h-8">
                    <svg className="w-full h-full" viewBox="0 0 100 30">
                      <polyline
                        fill="none"
                        stroke={metric.changeType === "positive" ? "#10b981" : "#ef4444"}
                        strokeWidth="2"
                        points={metric.trend.map((value, index) => {
                          const x = (index / (metric.trend.length - 1)) * 100;
                          const maxValue = Math.max(...metric.trend);
                          const minValue = Math.min(...metric.trend);
                          const y = 30 - ((value - minValue) / (maxValue - minValue)) * 25;
                          return `${x},${y}`;
                        }).join(' ')}
                      />
                    </svg>
                  </div>
                </div>
                <div className={`h-1 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>

          {/* Main Chart and Traffic Sources */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Revenue Chart */}
            <div className={`lg:col-span-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Performance Trends</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Track your metrics over time</p>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => setSelectedMetric("revenue")}
                    className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      selectedMetric === "revenue"
                        ? theme === 'dark' ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'
                        : theme === 'dark'
                          ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Revenue
                  </button>
                  <button
                    onClick={() => setSelectedMetric("users")}
                    className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      selectedMetric === "users"
                        ? theme === 'dark' ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'
                        : theme === 'dark'
                          ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Users
                  </button>
                </div>
              </div>
              
              {/* Chart Visualization */}
              <div className="h-64">
                <div className="flex items-end justify-between h-full px-2">
                  {getChartData().map((data, index) => (
                    <div key={data.month} className="flex flex-col items-center flex-1">
                      <div className="w-full flex flex-col items-center justify-end h-full relative">
                        {/* Target Line */}
                        <div
                          className={`absolute w-full border-t-2 border-dashed ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
                          style={{ bottom: `${(data.target / getMaxValue()) * 100}%` }}
                        ></div>
                        {/* Actual Bar */}
                        <div
                          className="w-8 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg transition-all duration-500 hover:from-indigo-600 hover:to-indigo-500 relative z-10"
                          style={{
                            height: `${(data.value / getMaxValue()) * 100}%`,
                            animationDelay: `${index * 100}ms`,
                            animation: "grow 1s ease-out forwards",
                          }}
                        ></div>
                      </div>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-2`}>{data.month}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-full mr-2"></div>
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Actual</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 border-t-2 border-dashed ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded-full mr-2`}></div>
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Target</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Traffic Sources */}
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Traffic Sources</h3>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div key={source.source} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{source.source}</span>
                      <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{source.percentage}%</span>
                    </div>
                    <div className={`w-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                      <div
                        className={`${source.color} h-2 rounded-full transition-all duration-500 hover:opacity-80`}
                        style={{ width: `${source.percentage}%`, animationDelay: `${index * 100}ms` }}
                      ></div>
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{source.visitors.toLocaleString()} visitors</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Pages and Devices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Top Pages */}
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Top Pages</h3>
                <button className={`text-sm ${theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'} font-medium`}>
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div
                    key={page.page}
                    className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors duration-200 cursor-pointer group`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-600'} transition-colors duration-200`}>
                          {page.page}
                        </span>
                        <span className={`ml-2 text-xs ${theme === 'dark' ? 'text-gray-400 bg-gray-700' : 'text-gray-500 bg-gray-100'} px-2 py-1 rounded`}>
                          {page.views.toLocaleString()} views
                        </span>
                      </div>
                      <div className={`flex items-center space-x-4 mt-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span>Bounce: {page.bounceRate}%</span>
                        <span>Avg time: {page.avgTime}</span>
                      </div>
                    </div>
                    <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500 group-hover:text-indigo-400' : 'text-gray-400 group-hover:text-indigo-600'} group-hover:translate-x-1 transition-all duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Breakdown */}
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Device Breakdown</h3>
              <div className="space-y-4">
                {devices.map((device, index) => (
                  <div className={`flex items-center justify-between p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 hover:border-indigo-400' : 'border-gray-200 hover:border-indigo-300'} hover:shadow-md transition-all duration-200 cursor-pointer group`}>
                    <div className="flex items-center">
                      <div className={`w-10 h-10 ${device.color} rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300`}>
                        {device.device === "Desktop" && (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )}
                        {device.device === "Mobile" && (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        )}
                        {device.device === "Tablet" && (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{device.device}</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{device.users.toLocaleString()} users</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{device.percentage}%</p>
                      <div className={`w-16 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2 mt-1`}>
                        <div
                          className={`${device.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Bounce Rate</h4>
                <div className={`w-8 h-8 ${theme === 'dark' ? 'bg-red-900' : 'bg-red-100'} rounded-lg flex items-center justify-center`}>
                  <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
              </div>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{animatedMetrics.bounceRate}%</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-red-400' : 'text-red-600'} mt-1`}>+2.3% from last period</p>
            </div>

            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Page Views</h4>
                <div className={`w-8 h-8 ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg flex items-center justify-center`}>
                  <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{animatedMetrics.pageViews.toLocaleString()}</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-600'} mt-1`}>+18.2% from last period</p>
            </div>

            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Session Duration</h4>
                <div className={`w-8 h-8 ${theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100'} rounded-lg flex items-center justify-center`}>
                  <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>4m 32s</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-600'} mt-1`}>+12.8% from last period</p>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes grow {
            from {
              height: 0;
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
