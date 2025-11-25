"use client";

import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useState } from "react";
import Link from "next/link";

export default function Help() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium",
  });

  const categories = [
    { id: "all", name: "All Topics", icon: "📚", color: "bg-gray-500" },
    { id: "getting-started", name: "Getting Started", icon: "🚀", color: "bg-blue-500" },
    { id: "account", name: "Account & Billing", icon: "💳", color: "bg-green-500" },
    { id: "features", name: "Features", icon: "⚡", color: "bg-purple-500" },
    { id: "troubleshooting", name: "Troubleshooting", icon: "🔧", color: "bg-orange-500" },
    { id: "api", name: "API & Integration", icon: "🔌", color: "bg-indigo-500" },
  ];

  const faqs = [
    {
      id: 1,
      category: "getting-started",
      question: "How do I get started with the platform?",
      answer: "Getting started is easy! First, create an account by clicking the Sign Up button. Once registered, you'll have access to our dashboard where you can explore features, configure settings, and start using our services. We recommend starting with our interactive tutorial that guides you through the main features.",
      helpful: 45,
      views: 1234,
    },
    {
      id: 2,
      category: "account",
      question: "How do I update my billing information?",
      answer: "You can update your billing information by navigating to the Billing section in your dashboard. Click on 'Payment Methods' to add or update credit cards, and 'Billing Information' to update your address and billing email. All changes are secured with encryption and require email verification.",
      helpful: 38,
      views: 892,
    },
    {
      id: 3,
      category: "features",
      question: "What features are included in each plan?",
      answer: "Our plans are designed to scale with your needs. Basic includes core features and 5GB storage. Premium adds advanced analytics, API access, and 50GB storage. Enterprise offers unlimited storage, custom integrations, and priority support. You can compare all features on our pricing page or upgrade/downgrade at any time.",
      helpful: 52,
      views: 1567,
    },
    {
      id: 4,
      category: "troubleshooting",
      question: "Why am I experiencing slow performance?",
      answer: "Slow performance can be caused by several factors: large file uploads, network connectivity issues, or browser cache problems. Try clearing your browser cache, checking your internet connection, or using a different browser. If issues persist, contact our support team with details about when and where you experience the slowdown.",
      helpful: 29,
      views: 678,
    },
    {
      id: 5,
      category: "api",
      question: "How do I integrate with third-party services?",
      answer: "We offer RESTful APIs and webhooks for seamless integration. Visit the API documentation in your dashboard to get your API keys, review endpoints, and test requests. We provide SDKs for popular languages and frameworks. For complex integrations, consider our Enterprise plan which includes dedicated technical support.",
      helpful: 41,
      views: 945,
    },
    {
      id: 6,
      category: "account",
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time without penalties. Your service will continue until the end of your current billing period. You can also pause your subscription or downgrade to a lower tier. We also offer a 30-day money-back guarantee for new customers.",
      helpful: 67,
      views: 2341,
    },
    {
      id: 7,
      category: "getting-started",
      question: "How do I invite team members?",
      answer: "Navigate to the Team section in your dashboard and click 'Invite Member'. Enter their email address, select their role (Admin, Member, or Viewer), and they'll receive an invitation link. Team members can be managed, roles changed, or access revoked at any time.",
      helpful: 33,
      views: 567,
    },
    {
      id: 8,
      category: "features",
      question: "What is the storage limit and how can I increase it?",
      answer: "Storage limits depend on your plan: Basic (5GB), Premium (50GB), Enterprise (unlimited). You can monitor your usage in the dashboard. To increase storage, upgrade your plan or purchase additional storage add-ons. We automatically notify you when you're approaching your limit.",
      helpful: 44,
      views: 890,
    },
  ];

  const resources = [
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for all features",
      icon: "🎥",
      link: "/tutorials",
      color: "bg-red-500",
      count: 24,
    },
    {
      title: "Documentation",
      description: "Comprehensive guides and API reference",
      icon: "📖",
      link: "/docs",
      color: "bg-blue-500",
      count: 156,
    },
    {
      title: "Community Forum",
      description: "Connect with other users and share experiences",
      icon: "💬",
      link: "/community",
      color: "bg-green-500",
      count: "2.3k",
    },
    {
      title: "Webinars",
      description: "Live training sessions and Q&A with experts",
      icon: "🎓",
      link: "/webinars",
      color: "bg-purple-500",
      count: 8,
    },
    {
      title: "Blog",
      description: "Tips, tricks, and best practices",
      icon: "✍️",
      link: "/blog",
      color: "bg-orange-500",
      count: 89,
    },
    {
      title: "Status Page",
      description: "Real-time system status and uptime monitoring",
      icon: "🟢",
      link: "/status",
      color: "bg-teal-500",
      count: "99.9%",
    },
  ];

  const supportOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Available 24/7",
      responseTime: "Usually within 2 minutes",
      icon: "💬",
      color: "bg-green-500",
      action: "Start Chat",
    },
    {
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      availability: "Mon-Fri, 9AM-6PM EST",
      responseTime: "Usually within 24 hours",
      icon: "✉️",
      color: "bg-blue-500",
      action: "Send Email",
    },
    {
      title: "Phone Support",
      description: "Speak directly with a support specialist",
      availability: "Premium & Enterprise plans",
      responseTime: "Usually within 5 minutes",
      icon: "📞",
      color: "bg-purple-500",
      action: "Call Now",
    },
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Support request submitted! We\'ll get back to you soon.');
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      priority: "medium",
    });
  };

  return (
    <ProtectedRoute>
      <DashboardLayout 
        title="Help & Support" 
        subtitle="Find answers, get support, and learn how to make the most of our platform."
        actions={
          <div className="flex items-center space-x-3">
            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Documentation
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contact Support
            </button>
          </div>
        }
      >
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for help articles, FAQs, and guides..."
                  className="w-full px-4 py-3 pl-12 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Popular searches:</span>
                {["billing", "account setup", "API integration", "troubleshooting"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Browse by Category</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    activeCategory === category.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center text-white text-xl mx-auto mb-2`}>
                    {category.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{category.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h3>
              <span className="text-sm text-gray-600">
                {filteredFAQs.length} {filteredFAQs.length === 1 ? 'result' : 'results'} found
              </span>
            </div>
            
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900 pr-4">{faq.question}</h4>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          expandedFAQ === faq.id ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <div className="px-6 pb-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600 mt-4">{faq.answer}</p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{faq.views} views</span>
                          <span>{faq.helpful}% found this helpful</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-xs text-gray-600 hover:text-green-600 font-medium">
                            👍 Helpful
                          </button>
                          <button className="text-xs text-gray-600 hover:text-red-600 font-medium">
                            👎 Not Helpful
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Learning Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <Link
                  key={resource.title}
                  href={resource.link}
                  className="group block p-6 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-lg transition-all duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${resource.color} rounded-lg flex items-center justify-center text-white text-2xl mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      {resource.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                        {resource.title}
                      </h4>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {resource.count} {typeof resource.count === 'number' ? 'items' : 'uptime'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                  <div className="flex items-center text-sm text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors duration-200">
                    Explore
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Support Options */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Support</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {supportOptions.map((option, index) => (
                <div
                  key={option.title}
                  className="p-6 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-lg transition-all duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center text-white text-2xl mb-4`}>
                    {option.icon}
                  </div>
                  <h4 className="text-base font-semibold text-gray-900 mb-2">{option.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                  <div className="space-y-2 text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {option.availability}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {option.responseTime}
                    </div>
                  </div>
                  <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium">
                    {option.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Send us a Message</h3>
            <form onSubmit={handleContactSubmit} className="max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={contactForm.priority}
                    onChange={(e) => setContactForm(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  We'll respond within 24 hours during business hours.
                </p>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
