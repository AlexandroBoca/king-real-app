"use client";

import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    revenue: 0,
    growth: 0,
    engagement: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Animate stats on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        users: 2849,
        revenue: 45678,
        growth: 23.5,
        engagement: 89.2,
      });
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      id: "users",
      name: "Total Users",
      value: animatedStats.users.toLocaleString(),
      change: "+12.5%",
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
    },
    {
      id: "revenue",
      name: "Revenue",
      value: `$${animatedStats.revenue.toLocaleString()}`,
      change: "+8.2%",
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
    },
    {
      id: "growth",
      name: "Growth Rate",
      value: `${animatedStats.growth}%`,
      change: "+3.1%",
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
    },
    {
      id: "engagement",
      name: "Engagement",
      value: `${animatedStats.engagement}%`,
      change: "-2.4%",
      changeType: "negative",
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
      ),
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const quickActions = [
    {
      name: "Create New Project",
      description: "Start a new project from scratch",
      icon: (
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      ),
      href: "/dashboard/projects/new",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      name: "View Analytics",
      description: "Check your performance metrics",
      icon: (
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      ),
      href: "/dashboard/analytics",
      color: "from-pink-500 to-pink-600",
    },
    {
      name: "Manage Team",
      description: "Invite and manage team members",
      icon: (
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      ),
      href: "/dashboard/team",
      color: "from-teal-500 to-teal-600",
    },
    {
      name: "Settings",
      description: "Configure your account settings",
      icon: (
        <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      ),
      href: "/dashboard/settings",
      color: "from-gray-500 to-gray-600",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      user: "Sarah Johnson",
      action: "completed the onboarding process",
      time: "2 hours ago",
      avatar: "SJ",
      color: "bg-purple-500",
    },
    {
      id: 2,
      user: "Mike Chen",
      action: "uploaded a new document",
      time: "4 hours ago",
      avatar: "MC",
      color: "bg-blue-500",
    },
    {
      id: 3,
      user: "Emma Davis",
      action: "joined the team",
      time: "6 hours ago",
      avatar: "ED",
      color: "bg-green-500",
    },
    {
      id: 4,
      user: "Alex Turner",
      action: "updated profile settings",
      time: "1 day ago",
      avatar: "AT",
      color: "bg-orange-500",
    },
  ];

  const chartData = [
    { name: "Mon", value: 4000, pv: 2400 },
    { name: "Tue", value: 3000, pv: 1398 },
    { name: "Wed", value: 2000, pv: 9800 },
    { name: "Thu", value: 2780, pv: 3908 },
    { name: "Fri", value: 1890, pv: 4800 },
    { name: "Sat", value: 2390, pv: 3800 },
    { name: "Sun", value: 3490, pv: 4300 },
  ];

  const periods = [
    { id: "day", name: "Today" },
    { id: "week", name: "This Week" },
    { id: "month", name: "This Month" },
    { id: "year", name: "This Year" },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout 
        title="Dashboard" 
        subtitle={`Welcome back, ${user?.firstName}! Here's what's happening with your account.`}
        actions={
          <div className="flex items-center space-x-3">
            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </button>
          </div>
        }
      >
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden group`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <div className={`flex items-center text-sm font-medium ${
                      stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                    }`}>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={stat.changeType === "positive" ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}
                        />
                      </svg>
                      {stat.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                    <p className={`text-2xl font-bold text-gray-900 ${isLoading ? 'animate-pulse' : ''}`}>
                      {isLoading ? '---' : stat.value}
                    </p>
                  </div>
                </div>
                <div className={`h-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>

          {/* Chart and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Chart Section */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
                  <p className="text-sm text-gray-600 mt-1">Track your revenue over time</p>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  {periods.map((period) => (
                    <button
                      key={period.id}
                      onClick={() => setSelectedPeriod(period.id)}
                      className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        selectedPeriod === period.id
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {period.name}
                    </button>
                  ))}
                </div>
              </div>
　　 　 　 　 {/* Simple Chart Visualization */}
              <div className="space-y-4">
                <div className="flex items-end justify-between h-48 px-2">
                  {chartData.map((data, index) => (
                    <div key={data.name} className="flex flex-col items-center flex-1">
                      <div className="w-full flex flex-col items-center">
                        <div
                          className="w-8 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg transition-all duration-500 hover:from-indigo-600 hover:to-indigo-500"
                          style={{
                            height: `${(data.value / 10000) * 100}%`,
                            animationDelay: `${index * 50}ms`,
                            animation: "grow 1s ease-out forwards",
                          }}
                        ></div>
                        <div
                          className="w-8 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg transition-all duration-500 hover:from-purple-600 hover:to-purple-500 mt-1"
                          style={{
                            height: `${(data.pv / 10000) * 100}%`,
                            animationDelay: `${index * 50 + 200}ms`,
                            animation: "grow 1s ease-out forwards",
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 mt-2">{data.name}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-full mr-2"></div>
                    <span className="text-gray-600">Revenue</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-t from-purple-500 to-purple-400 rounded-full mr-2"></div>
                    <span className="text-gray-600">Profit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    className="group block p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center">
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        {action.icon}
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                          {action.name}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7m0 0l-7-7m7-7V3" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <p className="text-sm text-gray-600 mt-1">Latest updates from your team</p>
              </div>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center text-white font-medium text-sm group-hover:scale-110 transition-transform duration-300`}>
                    {activity.avatar}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{activity.time}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7m0 0l-7-7m7-7V3" />
                  </svg>
                </div>
              ))}
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
