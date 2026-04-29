"use client";

import React, { useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { FiFileText, FiEdit2, FiCheck } from "react-icons/fi";

type User = {
  id: number;
  name: string;
  role: string;
  active: boolean;
};

type Errors = {
  name?: string;
  role?: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", role: "user", active: true },
    { id: 2, name: "Sarah Smith", role: "editor", active: true },
    { id: 3, name: "Tom Thompson", role: "admin", active: true },
  ]);

  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [userCount, setUserCount] = useState("1,234");
  const [activeSessions, setActiveSessions] = useState("87");
  const [activities, setActivities] = useState([
    "John Doe logged in",
    "Sarah Smith published an article",
    "New user registered",
  ]);
  const [alertText, setAlertText] = useState("Alert: System error during last backup");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setErrors({});
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => prev ? { ...prev, [name]: value } : prev);
  };

  const validateUser = () => {
    const newErrors: Errors = {};
    if (!editedUser?.name || editedUser.name.trim().length < 2)
      newErrors.name = "Name must contain at least 2 characters.";
    if (!editedUser?.role) newErrors.role = "Role is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUserSave = () => {
    if (!validateUser() || !editedUser) return;
    setUsers((prev) => prev.map((u) => (u.id === editedUser.id ? editedUser : u)));
    setSelectedUser(null);
    setEditedUser(null);
    setErrors({});
  };

  const updateActivity = (index: number, value: string) => {
    setActivities((prev) => prev.map((a, i) => (i === index ? value : a)));
  };

  return (
    <div className="w-full max-w-sm mx-auto md:max-w-7xl md:mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-12 space-y-6 text-gray-200">

      {/* Header & Edit Button */}
      <div className="flex items-center justify-between gap-4 border-b border-[#3A3D50] pb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Admin Dashboard</h1>
        <button
          onClick={() => setEditMode((prev) => !prev)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
            editMode ? "bg-green-600 shadow-green-900/20" : "bg-[#7217E8] shadow-[#7217E8]/20"
          }`}
        >
          {editMode ? <FiCheck size={14} /> : <FiEdit2 size={14} />}
          {editMode ? "Save" : "Edit"}
        </button>
      </div>

      {/* 1. Dashboard Overview */}
      <section className="p-5 md:p-6 border border-[#3A3D50] rounded-2xl shadow-xl bg-card space-y-4">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#7217E8] font-bold">Dashboard Overview</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div className="p-4 border border-[#3A3D50] rounded-xl bg-background/50">
            <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-1">Total Users</p>
            {editMode ? (
              <input value={userCount} onChange={(e) => setUserCount(e.target.value)} className="text-2xl font-bold w-full border-b border-[#7217E8] bg-transparent outline-none text-white" />
            ) : (
              <p className="text-2xl font-bold text-white">{userCount}</p>
            )}
          </div>
          <div className="p-4 border border-[#3A3D50] rounded-xl bg-background/50">
            <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-1">Active Sessions</p>
            {editMode ? (
              <input value={activeSessions} onChange={(e) => setActiveSessions(e.target.value)} className="text-2xl font-bold w-full border-b border-[#7217E8] bg-transparent outline-none text-white" />
            ) : (
              <p className="text-2xl font-bold text-white">{activeSessions}</p>
            )}
          </div>
          <div className="p-4 border border-[#3A3D50] rounded-xl bg-background/50">
            <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-1">Recent Activities</p>
            <ul className="space-y-1">
              {activities.map((a, i) =>
                editMode ? (
                  <input key={i} value={a} onChange={(e) => updateActivity(i, e.target.value)} className="w-full border-b border-[#3A3D50] bg-transparent outline-none text-xs text-gray-300" />
                ) : (
                  <li key={i} className="text-xs text-gray-400">• {a}</li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="mt-2 p-4 border border-yellow-500/20 rounded-xl bg-yellow-500/5 flex items-center space-x-3">
          <AiOutlineWarning className="text-yellow-500 shrink-0" />
          {editMode ? (
            <input value={alertText} onChange={(e) => setAlertText(e.target.value)} className="w-full border-b border-yellow-500/40 bg-transparent outline-none text-xs text-yellow-200" />
          ) : (
            <p className="text-xs text-yellow-200/80">{alertText}</p>
          )}
        </div>
      </section>

      {/* 2. User Management */}
      <section className="p-5 md:p-6 border border-[#3A3D50] rounded-2xl shadow-xl bg-card space-y-4">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#7217E8] font-bold">User Management</span>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-[#3A3D50] bg-background/50 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#7217E8] transition-colors"
        />
        <div className="overflow-x-auto rounded-xl border border-[#3A3D50]">
          <table className="w-full text-left text-[11px] md:text-xs">
            <thead className="bg-white/5 text-gray-400 uppercase tracking-tighter">
              <tr>
                <th className="p-3 font-bold">Name</th>
                <th className="p-3 font-bold">Role</th>
                <th className="p-3 font-bold">Status</th>
                <th className="p-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A3D50]">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 text-gray-200 font-medium">{u.name}</td>
                  <td className="p-3"><span className="text-[#7217E8] font-bold">{u.role}</span></td>
                  <td className="p-3 text-gray-400">{u.active ? "Active" : "Inactive"}</td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button onClick={() => handleEdit(u)} className="p-1.5 bg-yellow-500/10 text-yellow-500 rounded-lg"><FiEdit2 size={12} /></button>
                      <button className="px-2 py-1 bg-white/5 text-gray-400 rounded-lg font-bold uppercase text-[9px]">Block</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Grid for Small Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 3. Content Management */}
        <section className="p-5 border border-[#3A3D50] rounded-2xl bg-card space-y-4">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#7217E8] font-bold">Content</span>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest">
              <FiFileText /> <span>New Article</span>
            </button>
            <button className="px-4 py-2 bg-white/5 border border-[#3A3D50] rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-300">Media</button>
          </div>
        </section>

        {/* 4. Settings */}
        <section className="p-5 border border-[#3A3D50] rounded-2xl bg-card space-y-4">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#7217E8] font-bold">Settings</span>
          <div className="grid grid-cols-2 gap-2">
            {["Site Settings", "Templates", "API Keys", "Payments"].map((item) => (
              <div key={item} className="p-2 border border-[#3A3D50] rounded-lg bg-background/30 text-[10px] font-bold text-gray-400">{item}</div>
            ))}
          </div>
        </section>

        {/* 5. Security */}
        <section className="p-5 border border-[#3A3D50] rounded-2xl bg-card space-y-4">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#7217E8] font-bold">Security</span>
          <div className="space-y-2">
            <div className="p-2 border border-[#3A3D50] rounded-lg bg-background/30 text-[10px] font-bold text-gray-400">Two-Factor Auth</div>
            <div className="p-2 border border-[#3A3D50] rounded-lg bg-background/30 text-[10px] font-bold text-gray-400">Audit Logs</div>
          </div>
        </section>
      </div>

      {/* Edit User Modal */}
      {selectedUser && editedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-[#1a1a2e] border border-[#3A3D50] w-full max-w-md rounded-3xl shadow-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Edit User</h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Name</label>
                <input name="name" value={editedUser.name} onChange={handleUserChange} className="w-full bg-background/50 border border-[#3A3D50] rounded-xl px-4 py-2.5 text-sm outline-none text-white focus:border-[#7217E8]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Role</label>
                <select name="role" value={editedUser.role} onChange={handleUserChange} className="w-full bg-background/50 border border-[#3A3D50] rounded-xl px-4 py-2.5 text-sm outline-none text-white">
                  <option value="user">User</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-[#3A3D50]">
                <input type="checkbox" checked={editedUser.active} onChange={(e) => setEditedUser((prev) => prev ? { ...prev, active: e.target.checked } : prev)} className="w-4 h-4 rounded border-[#3A3D50] bg-transparent text-[#7217E8]" />
                <label className="text-sm font-medium text-gray-300">Active Account</label>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleUserSave} className="flex-1 py-3 rounded-xl bg-[#7217E8] text-white font-bold text-xs uppercase tracking-widest">Save</button>
              <button onClick={() => { setSelectedUser(null); setErrors({}); }} className="px-6 py-3 rounded-xl bg-white/5 text-gray-400 font-bold text-xs uppercase tracking-widest border border-[#3A3D50]">Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}