"use client";

import { useState } from "react";
import { AiOutlineWarning, AiOutlineUser } from "react-icons/ai";
import { FiSettings, FiFileText } from "react-icons/fi";

export default function AdminPage() {
  const [users, setUsers] = useState([
    { id: 1, naam: "Jan Jansen", rol: "gebruiker", actief: true },
    { id: 2, naam: "Sara Peeters", rol: "editor", actief: true },
    { id: 3, naam: "Tom Claes", rol: "admin", actief: true },
  ]);

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((u) =>
    u.naam.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* 1. Dashboard / Overzicht */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Dashboard / Overzicht</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded bg-gray-50">
            <p className="text-gray-500">Aantal gebruikers</p>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="p-4 border rounded bg-gray-50">
            <p className="text-gray-500">Actieve sessies</p>
            <p className="text-2xl font-bold">87</p>
          </div>
          <div className="p-4 border rounded bg-gray-50">
            <p className="text-gray-500">Recente activiteiten</p>
            <ul className="list-disc ml-5">
              <li>Jan Jansen ingelogd</li>
              <li>Sara Peeters artikel gepubliceerd</li>
              <li>Nieuwe gebruiker geregistreerd</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 border rounded bg-yellow-50 flex items-center space-x-2">
          <AiOutlineWarning className="text-yellow-600" />
          <p>Alert: Systeemfout bij laatste backup</p>
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
          className="w-full border rounded px-2 py-1 bg-gray-100"
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
                <td className="p-2 border">
                  {u.actief ? "Ja" : "Nee"}
                </td>
                <td className="p-2 border space-x-2">
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
            <FiFileText /> Nieuw artikel
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Media beheren
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Categorieën & tags
          </button>
        </div>
      </section>

      {/* 4. Instellingen / Configuratie */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Instellingen / Configuratie</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded bg-gray-50">
            <p className="font-medium">Site-instellingen</p>
            <p>Naam, logo, contactgegevens</p>
          </div>
          <div className="border p-4 rounded bg-gray-50">
            <p className="font-medium">E-mail templates</p>
            <p>Notificaties instellen</p>
          </div>
          <div className="border p-4 rounded bg-gray-50">
            <p className="font-medium">Integraties</p>
            <p>API-sleutels, externe tools</p>
          </div>
          <div className="border p-4 rounded bg-gray-50">
            <p className="font-medium">Betalingsinstellingen</p>
            <p>Abonnementen beheren</p>
          </div>
        </div>
      </section>

      {/* 5. Beveiliging & Toegang */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Beveiliging & Toegang</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded bg-gray-50">
            <p className="font-medium">Rollen & permissies</p>
            <p>Per sectie instellen</p>
          </div>
          <div className="border p-4 rounded bg-gray-50">
            <p className="font-medium">Twee-factor-authenticatie</p>
            <p>Verplicht voor beheerders</p>
          </div>
          <div className="border p-4 rounded bg-gray-50">
            <p className="font-medium">Audit log</p>
            <p>Overzicht van admin-activiteiten</p>
          </div>
        </div>
      </section>

      {/* 6. Data en rapportages */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Data en rapportages</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Export gebruikersdata
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Grafieken & rapporten
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Backups maken/herstellen
          </button>
        </div>
      </section>

      {/* 7. Functies voor efficiency */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Functies voor efficiency</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Bulk acties
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Zoeken & filteren
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Notificaties
          </button>
        </div>
      </section>
      <div className="mt-10 text-center">
  <a
    href="https://example.com/your-survey-link"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 hover:animate-pulse transition"
  >
    Neem deel aan de survey
  </a>
  <p className="mt-2 text-gray-600 text-sm">
    Klik op de knop om onze korte survey in te vullen. Dit helpt ons om de admin-ervaring te verbeteren en feedback te verzamelen.
  </p>
</div>
    </div>
  );
}