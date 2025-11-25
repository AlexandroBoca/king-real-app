"use client";

import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import Link from "next/link";
import { useState } from "react";

export default function Billing() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState("premium");

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$9",
      period: "/month",
      features: [
        "Access to basic features",
        "5 GB storage",
        "Email support",
        "Basic analytics",
      ],
      current: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$29",
      period: "/month",
      features: [
        "All Basic features",
        "50 GB storage",
        "Priority email support",
        "Advanced analytics",
        "API access",
        "Custom integrations",
      ],
      current: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: [
        "All Premium features",
        "Unlimited storage",
        "24/7 phone support",
        "Custom analytics",
        "Advanced API access",
        "Dedicated account manager",
        "SLA guarantee",
      ],
      current: false,
    },
  ];

  const billingHistory = [
    {
      id: "INV-001",
      date: "2024-01-15",
      description: "Premium Plan - Monthly",
      amount: "$29.00",
      status: "Paid",
    },
    {
      id: "INV-002",
      date: "2023-12-15",
      description: "Premium Plan - Monthly",
      amount: "$29.00",
      status: "Paid",
    },
    {
      id: "INV-003",
      date: "2023-11-15",
      description: "Premium Plan - Monthly",
      amount: "$29.00",
      status: "Paid",
    },
  ];

  const paymentMethods = [
    {
      id: "card-1",
      type: "Visa",
      last4: "4242",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: "card-2",
      type: "Mastercard",
      last4: "8888",
      expiry: "09/24",
      isDefault: false,
    },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout 
        title="Billing & Plans" 
        subtitle="Manage your subscription, payment methods, and billing history."
      >
        <div className="max-w-7xl mx-auto">
          {/* Current Plan Status */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
                <p className="text-2xl font-bold text-indigo-600 mt-1">Premium</p>
                <p className="text-sm text-gray-600 mt-1">$29/month • Renews on February 15, 2024</p>
              </div>
              <div className="flex space-x-3">
                <button className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium">
                  Manage Plan
                </button>
                <button className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium">
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-white rounded-lg shadow p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
                    plan.current ? "ring-2 ring-indigo-500" : ""
                  }`}
                >
                  {plan.current && (
                    <div className="bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                      CURRENT PLAN
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900 transition-colors duration-300">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start transition-transform duration-300 hover:translate-x-1">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`mt-6 w-full py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                      plan.current
                        ? "bg-gray-100 text-gray-700 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5"
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? "Current Plan" : plan.id === "enterprise" ? "Contact Sales" : "Upgrade"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
                <button className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                  Add Payment Method
                </button>
              </div>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-bold">{method.type[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {method.type} •••• {method.last4}
                        </p>
                        <p className="text-xs text-gray-500">Expires {method.expiry}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Default</span>
                      )}
                      <button className="text-red-600 hover:text-red-500 text-sm">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Billing Email</label>
                  <p className="text-sm text-gray-900 mt-1">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Billing Address</label>
                  <p className="text-sm text-gray-900 mt-1">123 Main Street</p>
                  <p className="text-sm text-gray-900">City, State 12345</p>
                  <p className="text-sm text-gray-900">United States</p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                  Update Billing Information
                </button>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {billingHistory.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {invoice.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {invoice.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {invoice.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
