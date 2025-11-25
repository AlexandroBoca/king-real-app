"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function Profile() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    bio: "Passionate developer and tech enthusiast. Love building amazing web applications.",
    location: "San Francisco, CA",
    website: "https://mywebsite.com",
    github: "myusername",
    twitter: "@myusername",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    twoFactorAuth: false,
    profileVisibility: "public",
    language: "en",
    timezone: "America/Los_Angeles",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setPreferences(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    
    try {
      // Simulate API call to save profile
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would save to a backend
      console.log("Saving profile:", formData);
      console.log("Saving preferences:", preferences);
      
      // Update user context if email/name changed
      if (formData.email !== user?.email || formData.firstName !== user?.firstName || formData.lastName !== user?.lastName) {
        // In a real app, you'd update the user context here
        console.log("User information updated");
      }
      
      setSaveStatus("success");
      setIsEditing(false);
      
      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      console.error("Failed to save profile:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: "+1 (555) 123-4567",
      bio: "Passionate developer and tech enthusiast. Love building amazing web applications.",
      location: "San Francisco, CA",
      website: "https://mywebsite.com",
      github: "myusername",
      twitter: "@myusername",
    });
    setIsEditing(false);
    setSaveStatus("idle");
  };

  return (
    <ProtectedRoute>
      <DashboardLayout 
        title="Profile" 
        subtitle="Manage your personal information and preferences"
        actions={
          isEditing ? (
            <>
              <button
                onClick={handleCancel}
                disabled={saveStatus === "saving"}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saveStatus === "saving"}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {saveStatus === "saving" ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          )
        }
      >
        <div className="max-w-4xl mx-auto">
          {saveStatus === "success" && (
            <div className="mb-4 flex items-center text-sm text-green-600 bg-green-50 p-3 rounded-md">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Profile updated successfully!
            </div>
          )}
          {saveStatus === "error" && (
            <div className="mb-4 flex items-center text-sm text-red-600 bg-red-50 p-3 rounded-md">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Failed to update profile. Please try again.
            </div>
          )}
              {/* Profile Header */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="h-24 w-24 bg-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </span>
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </h2>
                    <p className="text-gray-600">{user?.email}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Premium Account
                      </span>
                      <span className="text-sm text-gray-500">Member since January 2024</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Profile Information */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Basic Information */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                        <input
                          type="text"
                          name="github"
                          value={formData.github}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                        <input
                          type="text"
                          name="twitter"
                          value={formData.twitter}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                          <p className="text-xs text-gray-500">Receive email updates about your account</p>
                        </div>
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={preferences.emailNotifications}
                          onChange={handlePreferenceChange}
                          disabled={!isEditing}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:opacity-50"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Push Notifications</label>
                          <p className="text-xs text-gray-500">Receive push notifications in your browser</p>
                        </div>
                        <input
                          type="checkbox"
                          name="pushNotifications"
                          checked={preferences.pushNotifications}
                          onChange={handlePreferenceChange}
                          disabled={!isEditing}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:opacity-50"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Marketing Emails</label>
                          <p className="text-xs text-gray-500">Receive emails about new features and offers</p>
                        </div>
                        <input
                          type="checkbox"
                          name="marketingEmails"
                          checked={preferences.marketingEmails}
                          onChange={handlePreferenceChange}
                          disabled={!isEditing}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:opacity-50"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
                          <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <input
                          type="checkbox"
                          name="twoFactorAuth"
                          checked={preferences.twoFactorAuth}
                          onChange={handlePreferenceChange}
                          disabled={!isEditing}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Account Stats */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Account Type</span>
                        <span className="text-sm font-medium text-gray-900">Premium</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Member Since</span>
                        <span className="text-sm font-medium text-gray-900">Jan 15, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Last Login</span>
                        <span className="text-sm font-medium text-gray-900">Today</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Storage Used</span>
                        <span className="text-sm font-medium text-gray-900">12.5 GB / 50 GB</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">25% storage used</p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md text-sm font-medium text-gray-700 transition-colors">
                        Change Password
                      </button>
                      <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md text-sm font-medium text-gray-700 transition-colors">
                        Download Data
                      </button>
                      <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md text-sm font-medium text-gray-700 transition-colors">
                        Privacy Settings
                      </button>
                      <button className="w-full text-left px-4 py-3 bg-red-50 hover:bg-red-100 rounded-md text-sm font-medium text-red-700 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>

                  {/* Language & Timezone */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Language & Region</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                        <select
                          name="language"
                          value={preferences.language}
                          onChange={handlePreferenceChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                        <select
                          name="timezone"
                          value={preferences.timezone}
                          onChange={handlePreferenceChange}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
                        >
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="Europe/London">London (GMT)</option>
                          <option value="Asia/Tokyo">Tokyo (JST)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
