"use client";

import { useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { FiFileText, FiEdit2, FiCheck } from "react-icons/fi";

export default function AdminPage() {
  const [users, setUsers] = useState([
    { id: 1, naam: "Jan Jansen", rol: "gebruiker", actief: true },
    { id: 2, naam: "Sara Peeters", rol: "editor", actief: true },
    { id: 3, naam: "Tom Claes", rol: "admin", actief: true },
  ]);

  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState(false);

  // Editable content state
  const [aantalGebruikers, setAantalGebruikers] = useState("1,234");
  const [actieveSessies, setActieveSessies] = useState("87");
  const [activiteiten, setActiviteiten] = useState([
    "Jan Jansen ingelogd",
    "Sara Peeters artikel gepubliceerd",
    "Nieuwe gebruiker geregistreerd",
  ]);
  const [alertText, setAlertText] = useState("Alert: Systeemfout bij laatste backup");

  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [errors, setErrors] = useState({});

  const filteredUsers = users.filter((u) =>
    u.naam.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setErrors({});
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const validateUser = () => {
    const newErrors = {};
    if (!editedUser.naam || editedUser.naam.trim().length < 2)
      newErrors.naam = "Naam moet minstens 2 karakters bevatten.";
    if (!editedUser.rol) newErrors.rol = "Rol is verplicht.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUserSave = () => {
    if (!validateUser()) return;
    setUsers((prev) => prev.map((u) => (u.id === editedUser.id ? editedUser : u)));
    setSelectedUser(null);
    setEditedUser(null);
    setErrors({});
  };

  const updateActiviteit = (index, value) => {
    setActiviteiten((prev) => prev.map((a, i) => (i === index ? value : a)));
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
          {editMode ? "Opslaan" : "Bewerken"}
        </button>
      </div>

      {/* 1. Dashboard / Overzicht */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Dashboard / Overzicht</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded bg-gray-50">
            <p className="text-gray-500">Aantal gebruikers</p>
            {editMode ? (
              <input
                value={aantalGebruikers}
                onChange={(e) => setAantalGebruikers(e.target.value)}
                className="text-2xl font-bold w-full border-b border-primary bg-transparent outline-none"
              />
            ) : (
              <p className="text-2xl font-bold">{aantalGebruikers}</p>
            )}
          </div>
          <div className="p-4 border rounded bg-gray-50">
            <p className="text-gray-500">Actieve sessies</p>
            {editMode ? (
              <input
                value={actieveSessies}
                onChange={(e) => setActieveSessies(e.target.value)}
                className="text-2xl font-bold w-full border-b border-primary bg-transparent outline-none"
              />
            ) : (
              <p className="text-2xl font-bold">{actieveSessies}</p>
            )}
          </div>
          <div className="p-4 border rounded bg-gray-50">
            <p className="text-gray-500">Recente activiteiten</p>
            <ul className="list-disc ml-5 space-y-1">
              {activiteiten.map((a, i) =>
                editMode ? (
                  <input
                    key={i}
                    value={a}
                    onChange={(e) => updateActiviteit(i, e.target.value)}
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

      {/* 2. Gebruikersbeheer */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Gebruikersbeheer</h2>
        <input
          type="text"
          placeholder="Zoek gebruiker..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
        <table className="w-full text-left border-collapse mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Naam</th>
              <th className="p-2 border">Rol</th>
              <th className="p-2 border">Actief</th>
              <th className="p-2 border">Acties</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="p-2 border">{u.naam}</td>
                <td className="p-2 border">{u.rol}</td>
                <td className="p-2 border">{u.actief ? "Ja" : "Nee"}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(u)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Bewerken
                  </button>
                  <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Reset wachtwoord
                  </button>
                  <button className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                    Blokkeren
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 3. Contentbeheer */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Contentbeheer</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            <FiFileText /> <span>Nieuw artikel</span>
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Media beheren</button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Categorieën & tags</button>
        </div>
      </section>

      {/* 4. Instellingen / Configuratie */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Instellingen / Configuratie</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded bg-gray-50"><p className="font-medium">Site-instellingen</p><p>Naam, logo, contactgegevens</p></div>
          <div className="border p-4 rounded bg-gray-50"><p className="font-medium">E-mail templates</p><p>Notificaties instellen</p></div>
          <div className="border p-4 rounded bg-gray-50"><p className="font-medium">Integraties</p><p>API-sleutels, externe tools</p></div>
          <div className="border p-4 rounded bg-gray-50"><p className="font-medium">Betalingsinstellingen</p><p>Abonnementen beheren</p></div>
        </div>
      </section>

      {/* 5. Beveiliging & Toegang */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Beveiliging & Toegang</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded bg-gray-50"><p className="font-medium">Rollen & permissies</p><p>Per sectie instellen</p></div>
          <div className="border p-4 rounded bg-gray-50"><p className="font-medium">Twee-factor-authenticatie</p><p>Verplicht voor beheerders</p></div>
          <div className="border p-4 rounded bg-gray-50"><p className="font-medium">Audit log</p><p>Overzicht van admin-activiteiten</p></div>
        </div>
      </section>

      {/* 6. Data en rapportages */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Data en rapportages</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Export gebruikersdata</button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Grafieken & rapporten</button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Backups maken/herstellen</button>
        </div>
      </section>

      {/* 7. Functies voor efficiency */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Functies voor efficiency</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Bulk acties</button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Zoeken & filteren</button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Notificaties</button>
        </div>
      </section>

      {/* Edit User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-4">
            <h2 className="text-2xl font-bold">Gebruiker bewerken</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Naam</label>
              <input
                name="naam"
                value={editedUser.naam}
                onChange={handleUserChange}
                className="w-full border rounded-xl px-4 py-2"
              />
              {errors.naam && <p className="text-red-500 text-sm mt-1">{errors.naam}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rol</label>
              <select
                name="rol"
                value={editedUser.rol}
                onChange={handleUserChange}
                className="w-full border rounded-xl px-4 py-2"
              >
                <option value="gebruiker">Gebruiker</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
              {errors.rol && <p className="text-red-500 text-sm mt-1">{errors.rol}</p>}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="actief"
                checked={editedUser.actief}
                onChange={(e) => setEditedUser((prev) => ({ ...prev, actief: e.target.checked }))}
              />
              <label htmlFor="actief" className="text-sm font-medium">Actief</label>
            </div>
            <div className="flex gap-4 pt-2">
              <button
                onClick={handleUserSave}
                className="px-6 py-2 rounded-xl bg-green-600 text-white hover:opacity-90 transition"
              >
                Opslaan
              </button>
              <button
                onClick={() => { setSelectedUser(null); setErrors({}); }}
                className="px-6 py-2 rounded-xl bg-gray-600 text-white hover:opacity-90 transition"
              >
                Annuleren
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
