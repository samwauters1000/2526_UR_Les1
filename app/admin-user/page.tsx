"use client";

import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

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
    profielfoto: null,
    linkedin: "",
    twitter: "",
    website: "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePrivacyChange = (e) => {
    const { name, checked } = e.target;
    setPrivacySettings({ ...privacySettings, [name]: checked });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setUser({ ...user, profielfoto: URL.createObjectURL(file) });
  };

  const handlePhotoRemove = () => {
    setUser({ ...user, profielfoto: null });
  };

  const handleSave = (e) => {
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
        {/* 1. Gebruikersinformatie / Profielgegevens */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Gebruikersinformatie</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Naam</label>
            <input
              type="text"
              name="naam"
              value={user.naam}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1 bg-gray-100"
              placeholder="Volledige naam"
            />
          </div>
          <div>
            <label className="block font-medium">Gebruikersnaam</label>
            <input
              type="text"
              name="gebruikersnaam"
              value={user.gebruikersnaam}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1 bg-gray-100"
              placeholder="Gebruikersnaam"
            />
          </div>
          <div>
            <label className="block font-medium">E-mail</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1 bg-gray-100"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block font-medium">Telefoonnummer</label>
            <input
              type="tel"
              name="telefoon"
              value={user.telefoon}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1 bg-gray-100"
              placeholder="+32 123 456 789"
            />
          </div>

          {/* Adres */}
          <div>
            <label className="block font-medium">Straat</label>
            <input
              type="text"
              name="straat"
              value={user.straat}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1 bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium">Stad</label>
            <input
              type="text"
              name="stad"
              value={user.stad}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1 bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium">Postcode</label>
            <input
              type="text"
              name="postcode"
              value={user.postcode}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1 bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium">Land</label>
            <input
              type="text"
              name="land"
              value={user.land}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1 bg-gray-100"
            />
          </div>

          {/* Profielfoto */}
          <div className="md:col-span-2 flex items-center space-x-4">
            <div className="relative w-24 h-24 border rounded overflow-hidden">
              {user.profielfoto ? (
                <img
                  src={user.profielfoto}
                  alt="Profielfoto"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  Geen foto
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
              {user.profielfoto && (
                <button
                  type="button"
                  onClick={handlePhotoRemove}
                  className="text-red-600 hover:underline"
                >
                  Verwijder foto
                </button>
              )}
            </div>
          </div>

          {/* Sociale links */}
          <div>
            <label className="block font-medium">
              LinkedIn{" "}
              <AiOutlineInfoCircle
                className="inline text-gray-400"
                title="Optioneel, link naar je LinkedIn-profiel"
              />
            </label>
            <input
              type="url"
              name="linkedin"
              value={user.linkedin}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1 bg-gray-100"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <label className="block font-medium">Twitter</label>
            <input
              type="url"
              name="twitter"
              value={user.twitter}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1 bg-gray-100"
              placeholder="https://twitter.com/username"
            />
          </div>
          <div>
            <label className="block font-medium">Website</label>
            <input
              type="url"
              name="website"
              value={user.website}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1 bg-gray-100"
              placeholder="https://example.com"
            />
          </div>
        </form>
      </section>

      {/* 2. Accountinstellingen */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Accountinstellingen</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Oud wachtwoord</label>
            <input
              type="password"
              name="oudWachtwoord"
              value={passwordData.oudWachtwoord}
              onChange={handlePasswordChange}
              className="w-full border rounded px-2 py-1 bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium">Nieuw wachtwoord</label>
            <input
              type="password"
              name="nieuwWachtwoord"
              value={passwordData.nieuwWachtwoord}
              onChange={handlePasswordChange}
              className="w-full border rounded px-2 py-1 bg-gray-100"
              placeholder="Minimaal 8 tekens"
            />
          </div>
          <div>
            <label className="block font-medium">Bevestig nieuw wachtwoord</label>
            <input
              type="password"
              name="confirmWachtwoord"
              value={passwordData.confirmWachtwoord}
              onChange={handlePasswordChange}
              className="w-full border rounded px-2 py-1 bg-gray-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="twoFactor"
                onChange={(e) =>
                  setUser({ ...user, twoFactor: e.target.checked })
                }
              />
              <span>Schakel twee-factor-authenticatie (2FA) in</span>
            </label>
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium">Actieve sessies</label>
            <div className="border rounded p-2">
              <p>Desktop - Laatste login: 2 uur geleden</p>
              <p>Mobiel - Laatste login: gisteren</p>
              <button className="text-red-600 hover:underline mt-2">
                Uitloggen op alle apparaten
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* 3. Privacy & Beveiliging */}
      <section className="p-6 border rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Privacy & Beveiliging</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="profielZichtbaar"
              checked={privacySettings.profielZichtbaar}
              onChange={handlePrivacyChange}
            />
            <span>Profiel zichtbaar voor anderen</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="emailUpdates"
              checked={privacySettings.emailUpdates}
              onChange={handlePrivacyChange}
            />
            <span>Email updates ontvangen</span>
          </label>

          <div className="md:col-span-2">
            <label className="block font-medium">Account acties</label>
            <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 mr-2">
              Deactiveer account
            </button>
            <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
              Verwijder account
            </button>
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium">Activiteitlog</label>
            <div className="border rounded p-2">
              <p>Laatste login: 2 uur geleden</p>
              <p>Wachtwoord gewijzigd: 1 maand geleden</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Opslaan */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Opslaan
        </button>
      </div>
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