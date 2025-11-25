"use client";

import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import Link from "next/link";
import { useState } from "react";

export default function Billing() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
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
  ]);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardType: "",
  });

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, ''); // Remove spaces
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value; // Add spaces every 4 digits
    formattedValue = formattedValue.slice(0, 19); // Limit to 19 chars (16 digits + 3 spaces)
    
    // Detect card type
    let cardType = "";
    if (value.startsWith('4')) cardType = "Visa";
    else if (value.startsWith('5') || value.startsWith('2')) cardType = "Mastercard";
    else if (value.startsWith('3')) cardType = "American Express";
    
    setNewCard(prev => ({
      ...prev,
      cardNumber: formattedValue,
      cardType
    }));
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the card data to your payment processor
    console.log('Adding card:', newCard);
    
    // Add the new card to the payment methods list
    const newPaymentMethod = {
      id: `card-${Date.now()}`,
      type: newCard.cardType || "Card",
      last4: newCard.cardNumber.replace(/\s/g, '').slice(-4),
      expiry: `${newCard.expiryMonth}/${newCard.expiryYear.slice(-2)}`,
      isDefault: false, // Don't make new cards default by default
    };
    
    // Update the payment methods state using callback to get latest state
    setPaymentMethods(prev => {
      console.log('Previous payment methods:', prev);
      console.log('Adding new payment method:', newPaymentMethod);
      const updated = [...prev, newPaymentMethod];
      console.log('Updated payment methods:', updated);
      return updated;
    });
    
    // Show success message
    alert(`Card ending in ${newPaymentMethod.last4} added successfully!`);
    
    // Reset form and close modal
    setNewCard({
      cardNumber: "",
      cardholderName: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      cardType: "",
    });
    setShowAddCardModal(false);
  };

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "9.99",
      period: "/month",
      features: [
        "Access to basic features",
        "5 GB storage",
        "Email support",
        "Basic analytics",
      ],
      current: false,
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "29.99",
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
      popular: true,
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
      popular: false,
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

  return (
    <ProtectedRoute>
      <DashboardLayout 
        title="Billing & Plans" 
        subtitle="Manage your subscription, payment methods, and billing history."
      >
        <div className="max-w-7xl mx-auto">
          {/* Current Plan Status */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Current Plan</h2>
                <p className="text-xl sm:text-2xl font-bold text-indigo-600 mt-1">Premium</p>
                <p className="text-sm text-gray-600 mt-1">29.99/month • Renews on February 15, 2024</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium w-full sm:w-auto">
                  Manage Plan
                </button>
                <button className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium w-full sm:w-auto">
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Available Plans</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-4 sm:p-6 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer ${
                    selectedPlan === plan.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 bg-white hover:border-indigo-300"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{plan.name}</h3>
                    {plan.popular && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                      {plan.id === "enterprise" ? plan.price : `$${plan.price}`}
                    </span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedPlan === plan.id
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {plan.id === selectedPlan ? "Current Plan" : "Upgrade"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
              <button 
                onClick={() => setShowAddCardModal(true)}
                className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium w-full sm:w-auto transition-colors duration-200"
              >
                Add Payment Method
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id} 
                  className="relative p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all duration-200 cursor-pointer bg-white"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className={`w-12 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        method.type === 'Visa' ? 'bg-blue-600' : 
                        method.type === 'Mastercard' ? 'bg-red-600' : 
                        'bg-gray-800'
                      }`}>
                        <span className="text-white text-sm font-bold">
                          {method.type === 'Visa' ? 'V' : 
                           method.type === 'Mastercard' ? 'M' : 
                           method.type[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-base font-semibold text-gray-900">
                          {method.type}
                        </p>
                        <p className="text-sm text-gray-600 font-mono">
                          •••• {method.last4}
                        </p>
                      </div>
                    </div>
                    {method.isDefault && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Default
                      </span>
                    )}
                  </div>
                  
                  {/* Card Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Expires</span>
                      <span className="text-gray-900 font-medium">{method.expiry}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {/* Card chip visualization */}
                        <div className="w-8 h-6 bg-yellow-400 rounded-sm"></div>
                        <div className="w-8 h-6 bg-yellow-400 rounded-sm opacity-60"></div>
                      </div>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors duration-200">
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 hover:opacity-5 transition-opacity duration-200 pointer-events-none"></div>
                </div>
              ))}
              
              {/* Add New Payment Method Card */}
              <div 
                onClick={() => setShowAddCardModal(true)}
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors duration-200">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                    Add New Card
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Credit or debit card
                  </p>
                </div>
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
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Billing History</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {billingHistory.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {invoice.date}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {invoice.description}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {invoice.amount}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            invoice.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : invoice.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium hidden sm:table-cell">
                          <button className="text-indigo-600 hover:text-indigo-900">Download</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Add Card Modal */}
        {showAddCardModal && (
          <div className="fixed inset-0 z-[9999] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              {/* Background overlay */}
              <div 
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-[9998]"
                onClick={() => setShowAddCardModal(false)}
              ></div>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

              {/* Modal panel */}
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full z-[9999] relative">
                <form onSubmit={handleAddCard}>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="w-full">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                          Add New Payment Method
                        </h3>
                        
                        {/* Card Type Display */}
                        {newCard.cardType && (
                          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                            <p className="text-sm text-blue-800">
                              Card Type: <span className="font-semibold">{newCard.cardType}</span>
                            </p>
                          </div>
                        )}

                        <div className="space-y-4">
                          {/* Card Number */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Card Number</label>
                            <input
                              type="text"
                              value={newCard.cardNumber}
                              onChange={handleCardNumberChange}
                              placeholder="1234 5678 9012 3456"
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            />
                          </div>

                          {/* Cardholder Name */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                            <input
                              type="text"
                              value={newCard.cardholderName}
                              onChange={(e) => setNewCard(prev => ({ ...prev, cardholderName: e.target.value }))}
                              placeholder="John Doe"
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            />
                          </div>

                          {/* Expiry Date */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Month</label>
                              <select
                                value={newCard.expiryMonth}
                                onChange={(e) => setNewCard(prev => ({ ...prev, expiryMonth: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                              >
                                <option value="">MM</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                  <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                    {String(i + 1).padStart(2, '0')}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Year</label>
                              <select
                                value={newCard.expiryYear}
                                onChange={(e) => setNewCard(prev => ({ ...prev, expiryYear: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                              >
                                <option value="">YYYY</option>
                                {Array.from({ length: 10 }, (_, i) => {
                                  const year = new Date().getFullYear() + i;
                                  return (
                                    <option key={year} value={year}>
                                      {year}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>

                          {/* CVV */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">CVV</label>
                            <input
                              type="text"
                              value={newCard.cvv}
                              onChange={(e) => setNewCard(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                              placeholder="123"
                              maxLength={4}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Add Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddCardModal(false)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
