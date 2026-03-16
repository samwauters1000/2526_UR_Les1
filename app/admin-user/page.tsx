"use client";

import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const ENQUETE_URL = "https://example.com/your-survey-link";

export default function UserProfile() {
  const [user, setUser] = useState({
    naam: "",
    gebruikersnaam: "",
    email: "",
    telefoon: "",
    straat: "",
    stad: "",
    postcode: "",
    land: "",
    profielfoto: null as string | null,
    linkedin: "",
    twitter: "",
    website: "",
    twoFactor: false,
  });

  const [passwordData, setPasswordData] = useState({
    oudWachtwoord: "",
    nieuwWachtwoord: "",
    confirmWachtwoord: "",
  });

  const [privacySettings, setPrivacySettings] = useState({
    profielZichtbaar: false,
    emailUpdates: false,
  });

  const [feedback, setFeedback] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPrivacySettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUser((prev) => ({ ...prev, profielfoto: URL.createObjectURL(file) }));
  };

  const handlePhotoRemove = () => {
    setUser((prev) => ({ ...prev, profielfoto: null }));
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user.email.includes("@")) {
      setFeedback("Ongeldig e-mailadres");
      return;
    }
    if (
      passwordData.nieuwWachtwoord &&
      passwordData.nieuwWachtwoord !== passwordData.confirmWachtwoord
    ) {
      setFeedback("Wachtwoorden komen niet overeen");
      return;
    }
    setFeedback("Wijzigingen succesvol opgeslagen!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">

      {/* Title + Survey button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mijn Profiel</h1>
        <a
          href={ENQUETE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#7217E8",
            color: "#E8ECED",
            padding: "10px 20px",
            borderRadius: "0.75rem",
            fontWeight: 600,
            fontSize: "0.95rem",
            textDecoration: "none",
            boxShadow: "0 4px 14px rgba(114,23,232,0.45)",
            transition: "opacity 0.15s ease, transform 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
            (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
            (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "scale(0.95)";
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.03)";
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          Enquête
        </a>
      </div>

      {/* 1. Gebruikersinformatie */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Gebruikersinformatie</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Naam</label>
            <input type="text" name="naam" value={user.naam} onChange={handleInputChange} className="w-full border rounded px-2 py-1" placeholder="Volledige naam" />
          </div>
          <div>
            <label className="block font-medium">Gebruikersnaam</label>
            <input type="text" name="gebruikersnaam" value={user.gebruikersnaam} onChange={handleInputChange} className="w-full border rounded px-2 py-1" placeholder="Gebruikersnaam" />
          </div>
          <div>
            <label className="block font-medium">E-mail</label>
            <input type="email" name="email" value={user.email} onChange={handleInputChange} className="w-full border rounded px-2 py-1" placeholder="email@example.com" />
          </div>
          <div>
            <label className="block font-medium">Telefoonnummer</label>
            <input type="tel" name="telefoon" value={user.telefoon} onChange={handleInputChange} className="w-full border rounded px-2 py-1" placeholder="+32 123 456 789" />
          </div>
          <div>
            <label className="block font-medium">Straat</label>
            <input type="text" name="straat" value={user.straat} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block font-medium">Stad</label>
            <input type="text" name="stad" value={user.stad} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block font-medium">Postcode</label>
            <input type="text" name="postcode" value={user.postcode} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block font-medium">Land</label>
            <input type="text" name="land" value={user.land} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
          </div>

          {/* Profielfoto */}
          <div className="md:col-span-2 flex items-center space-x-4">
            <div className="w-24 h-24 border rounded overflow-hidden">
              {user.profielfoto ? (
                <img src={user.profielfoto} alt="Profielfoto" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm">Geen foto</div>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <input type="file" accept="image/*" onChange={handlePhotoUpload} />
              {user.profielfoto && (
                <button type="button" onClick={handlePhotoRemove} className="text-red-400 hover:underline">
                  Verwijder foto
                </button>
              )}
            </div>
          </div>

          {/* Sociale links */}
          <div>
            <label className="block font-medium">
              LinkedIn <AiOutlineInfoCircle className="inline text-gray-400" title="Optioneel" />
            </label>
            <input type="url" name="linkedin" value={user.linkedin} onChange={handleInputChange} className="w-full border rounded px-2 py-1" placeholder="https://linkedin.com/in/username" />
          </div>
          <div>
            <label className="block font-medium">Twitter</label>
            <input type="url" name="twitter" value={user.twitter} onChange={handleInputChange} className="w-full border rounded px-2 py-1" placeholder="https://twitter.com/username" />
          </div>
          <div>
            <label className="block font-medium">Website</label>
            <input type="url" name="website" value={user.website} onChange={handleInputChange} className="w-full border rounded px-2 py-1" placeholder="https://example.com" />
          </div>
        </div>
      </section>

      {/* 2. Accountinstellingen */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Accountinstellingen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Oud wachtwoord</label>
            <input type="password" name="oudWachtwoord" value={passwordData.oudWachtwoord} onChange={handlePasswordChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block font-medium">Nieuw wachtwoord</label>
            <input type="password" name="nieuwWachtwoord" value={passwordData.nieuwWachtwoord} onChange={handlePasswordChange} className="w-full border rounded px-2 py-1" placeholder="Minimaal 8 tekens" />
          </div>
          <div>
            <label className="block font-medium">Bevestig nieuw wachtwoord</label>
            <input type="password" name="confirmWachtwoord" value={passwordData.confirmWachtwoord} onChange={handlePasswordChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={user.twoFactor}
                onChange={(e) => setUser((prev) => ({ ...prev, twoFactor: e.target.checked }))}
              />
              <span>Schakel twee-factor-authenticatie (2FA) in</span>
            </label>
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium">Actieve sessies</label>
            <div className="border rounded p-2 space-y-1">
              <p>Desktop - Laatste login: 2 uur geleden</p>
              <p>Mobiel - Laatste login: gisteren</p>
              <button type="button" className="text-red-400 hover:underline mt-2">
                Uitloggen op alle apparaten
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Privacy & Beveiliging */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Privacy & Beveiliging</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="profielZichtbaar" checked={privacySettings.profielZichtbaar} onChange={handlePrivacyChange} />
            <span>Profiel zichtbaar voor anderen</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="emailUpdates" checked={privacySettings.emailUpdates} onChange={handlePrivacyChange} />
            <span>Email updates ontvangen</span>
          </label>
          <div className="md:col-span-2">
            <label className="block font-medium mb-2">Account acties</label>
            <button type="button" className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 mr-2">Deactiveer account</button>
            <button type="button" className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Verwijder account</button>
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium">Activiteitlog</label>
            <div className="border rounded p-2 space-y-1">
              <p>Laatste login: 2 uur geleden</p>
              <p>Wachtwoord gewijzigd: 1 maand geleden</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback */}
      {feedback && (
        <p className={`text-center font-medium ${feedback.includes("succesvol") ? "text-green-400" : "text-red-400"}`}>
          {feedback}
        </p>
      )}

      {/* Opslaan */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Opslaan
        </button>
      </div>

    </div>
  );
}
