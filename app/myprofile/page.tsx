"use client";

import React, { useState, ChangeEvent, MouseEvent } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    zipCode: "",
    country: "",
    profilePicture: null as string | null,
    linkedin: "",
    twitter: "",
    website: "",
    twoFactor: false,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: false,
    emailUpdates: false,
  });

  const [feedback, setFeedback] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrivacyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPrivacySettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUser((prev) => ({ ...prev, profilePicture: URL.createObjectURL(file) }));
    }
  };

  const handlePhotoRemove = () => {
    setUser((prev) => ({ ...prev, profilePicture: null }));
  };

  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user.email && !user.email.includes("@")) {
      setFeedback("Invalid email address");
      return;
    }
    if (
      passwordData.newPassword &&
      passwordData.newPassword !== passwordData.confirmPassword
    ) {
      setFeedback("Passwords do not match");
      return;
    }
    setFeedback("Changes saved successfully!");
    setTimeout(() => setFeedback(""), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Profile</h1>
      </div>

      {/* 1. User Information */}
      <section className="p-6 border rounded-xl shadow-sm space-y-4 bg-card">
        <h2 className="text-2xl font-semibold">User Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Name</label>
            <input type="text" name="name" value={user.name} onChange={handleInputChange} className="w-full border rounded px-3 py-2 bg-transparent" placeholder="Full name" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Username</label>
            <input type="text" name="username" value={user.username} onChange={handleInputChange} className="w-full border rounded px-3 py-2 bg-transparent" placeholder="Username" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <input type="email" name="email" value={user.email} onChange={handleInputChange} className="w-full border rounded px-3 py-2 bg-transparent" placeholder="email@example.com" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Phone</label>
            <input type="tel" name="phone" value={user.phone} onChange={handleInputChange} className="w-full border rounded px-3 py-2 bg-transparent" placeholder="+32..." />
          </div>
        </div>

        {/* Profile Picture */}
        <div className="flex items-center gap-6 pt-4">
          <div className="w-24 h-24 border-2 border-dashed rounded-full flex items-center justify-center overflow-hidden bg-muted">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-muted-foreground text-center px-2">No Image</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-sm cursor-pointer" />
            {user.profilePicture && (
              <button onClick={handlePhotoRemove} className="text-xs text-red-500 hover:underline text-left">
                Remove Photo
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Security */}
      <section className="p-6 border rounded-xl shadow-sm space-y-4 bg-card">
        <h2 className="text-2xl font-semibold">Account Security</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">New Password</label>
            <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="w-full border rounded px-3 py-2 bg-transparent" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Confirm Password</label>
            <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="w-full border rounded px-3 py-2 bg-transparent" />
          </div>
        </div>
      </section>

      {/* Status Messages */}
      {feedback && (
        <div className={`p-4 rounded-lg text-center font-medium ${feedback.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {feedback}
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}