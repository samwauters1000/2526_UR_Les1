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
    <div className="max-w-7xl mx-auto p-6 space-y-10">

      {/* Title + Edit toggle button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setEditMode((prev) => !prev)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: editMode ? "#16a34a" : "#7217E8",
            color: "#E8ECED",
            padding: "10px 20px",
            borderRadius: "0.75rem",
            fontWeight: 600,
            fontSize: "0.95rem",
            border: "none",
            cursor: "pointer",
            boxShadow: editMode
              ? "0 4px 14px rgba(22,163,74,0.4)"
              : "0 4px 14px rgba(114,23,232,0.45)",
            transition: "background-color 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          {editMode ? <FiCheck size={16} /> : <FiEdit2 size={16} />}
          {editMode ? "Save Changes" : "Edit Dashboard"}
        </button>
      </div>

      {/* 1. Dashboard / Overview */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded bg-gray-50">
            <p className="text-gray-500">Total Users</p>
            {editMode ? (
              <input
                value={userCount}
                onChange={(e) => setUserCount(e.target.value)}
                className="text-2xl font-bold w-full border-b border-primary bg-transparent outline-none"
              />
            ) : (
              <p className="text-2xl font-bold">{userCount}</p>
            )}
          </div>
          <div className="p-4 border rounded bg-gray-50">
            <p className="text-gray-500">Active Sessions</p>
            {editMode ? (
              <input
                value={activeSessions}
                onChange={(e) => setActiveSessions(e.target.value)}
                className="text-2xl font-bold w-full border-b border-primary bg-transparent outline-none"
              />
            ) : (
              <p className="text-2xl font-bold">{activeSessions}</p>
            )}
          </div>
          <div className="p-4 border rounded bg-gray-50">
            <p className="text-gray-500">Recent Activities</p>
            <ul className="list-disc ml-5 space-y-1">
              {activities.map((a, i) =>
                editMode ? (
                  <input
                    key={i}
                    value={a}
                    onChange={(e) => updateActivity(i, e.target.value)}
                    className="w-full border-b border-primary bg-transparent outline-none text-sm"
                  />
                ) : (
                  <li key={i}>{a}</li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 border rounded bg-yellow-50 flex items-center space-x-2">
          <AiOutlineWarning className="text-yellow-600 shrink-0" />
          {editMode ? (
            <input
              value={alertText}
              onChange={(e) => setAlertText(e.target.value)}
              className="w-full border-b border-yellow-500 bg-transparent outline-none"
            />
          ) : (
            <p>{alertText}</p>
          )}
        </div>
      </section>

      {/* 2. User Management */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse mt-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{u.name}</td>
                  <td className="p-2 border capitalize">{u.role}</td>
                  <td className="p-2 border">{u.active ? "Active" : "Inactive"}</td>
                  <td className="p-2 border space-x-2">
                    <button onClick={() => handleEdit(u)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm">
                      Edit
                    </button>
                    <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                      Reset Password
                    </button>
                    <button className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
                      Block
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Content Management */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Content Management</h2>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            <FiFileText /> <span>New Article</span>
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Manage Media</button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Categories & Tags</button>
        </div>
      </section>

      {/* 4. Settings / Configuration */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Settings & Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded bg-gray-50"><p className="font-medium">Site Settings</p><p className="text-sm text-gray-600">Name, logo, contact details</p></div>
          <div className="border p-4 rounded bg-gray-50"><p className="font-medium">Email Templates</p><p className="text-sm text-gray-600">Configure notifications</p></div>
          <div className="border p-4 rounded bg-gray-50"><p className="font-medium">Integrations</p><p className="text-sm text-gray-600">API keys, external tools</p></div>
          <div className="border p-4 rounded bg-gray-50"><p className="font-medium">Payment Settings</p><p className="text-sm text-gray-600">Manage subscriptions</p></div>
        </div>
      </section>

      {/* 5. Security & Access */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Security & Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded bg-gray-50"><p className="font-medium">Roles & Permissions</p><p className="text-sm text-gray-600">Configure per section</p></div>
          <div className="border p-4 rounded bg-gray-50"><p className="font-medium">Two-Factor Authentication</p><p className="text-sm text-gray-600">Mandatory for admins</p></div>
          <div className="border p-4 rounded bg-gray-50"><p className="font-medium">Audit Log</p><p className="text-sm text-gray-600">Overview of admin activities</p></div>
        </div>
      </section>

      {/* 6. Data & Reports */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Data & Reports</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Export User Data</button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Charts & Reports</button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Create/Restore Backups</button>
        </div>
      </section>

      {/* 7. Efficiency Tools */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Efficiency Tools</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Bulk Actions</button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Search & Filter</button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Notifications</button>
        </div>
      </section>

      {/* Edit User Modal */}
      {selectedUser && editedUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-4">
            <h2 className="text-2xl font-bold">Edit User</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                value={editedUser.name}
                onChange={handleUserChange}
                className="w-full border rounded-xl px-4 py-2"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                name="role"
                value={editedUser.role}
                onChange={handleUserChange}
                className="w-full border rounded-xl px-4 py-2"
              >
                <option value="user">User</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                checked={editedUser.active}
                onChange={(e) => setEditedUser((prev) => prev ? { ...prev, active: e.target.checked } : prev)}
              />
              <label htmlFor="active" className="text-sm font-medium">Active</label>
            </div>
            <div className="flex gap-4 pt-2">
              <button onClick={handleUserSave} className="px-6 py-2 rounded-xl bg-green-600 text-white hover:opacity-90 transition">
                Save
              </button>
              <button onClick={() => { setSelectedUser(null); setErrors({}); }} className="px-6 py-2 rounded-xl bg-gray-600 text-white hover:opacity-90 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}