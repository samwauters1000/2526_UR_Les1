"use client";

import React, { useState, ChangeEvent, MouseEvent } from "react";

export default function UserProfile() {
  const [user, setUser] = useState({ name: "", username: "", email: "", phone: "", profilePicture: null as string | null });
  const [feedback, setFeedback] = useState("");

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-12 space-y-6 text-gray-200">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-8 h-px bg-[#7217E8]/50" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">My Profile</h1>
      </div>

      <section className="p-6 border border-[#3A3D50] rounded-2xl bg-card shadow-xl space-y-6">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#7217E8] font-bold">User Information</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Name</label>
            <input className="w-full bg-background/50 border border-[#3A3D50] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#7217E8] transition-colors" placeholder="Full name" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
            <input className="w-full bg-background/50 border border-[#3A3D50] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#7217E8] transition-colors" placeholder="email@example.com" />
          </div>
        </div>
        {/* Photo Upload Area */}
        <div className="flex items-center gap-6 pt-2">
          <div className="w-20 h-20 border border-[#3A3D50] rounded-full bg-background/50 shrink-0" />
          <label className="cursor-pointer bg-white/5 border border-[#3A3D50] text-gray-300 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
            Choose Photo
            <input type="file" className="hidden" />
          </label>
        </div>
      </section>

      <div className="flex justify-end pt-2">
        <button className="bg-[#7217E8] hover:bg-[#5e12c4] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95">Save Changes</button>
      </div>
    </div>
  );
}