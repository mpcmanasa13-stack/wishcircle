"use client";

import { useState } from "react";
import AppShell from "./AppShell";

export function ProfileScreen({
  screen,
  setScreen,
  currentUser,
  wishes,
  circles,
  events,
  logoutUser,
}) {
  return (
    <AppShell
      screen={screen}
      setScreen={setScreen}
      showBack={true}
      backTo="home"
      title="Back to Home"
    >
      <div className="text-center mt-3">
        <div className="w-24 h-24 bg-[#7B1F2B] text-white rounded-full mx-auto flex items-center justify-center text-4xl font-semibold">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>

        <h1 className="text-3xl font-semibold text-[#301C1E] mt-5">
          {currentUser.name}
        </h1>

        <p className="text-sm text-[#786A68] mt-1">
          @{currentUser.username}
        </p>

        <p className="text-sm text-[#786A68] mt-2">
          🎂 {formatBirthday(currentUser.birthday)}
        </p>

        <p className="text-xs text-[#9A8B88] mt-2">
          {currentUser.email}
        </p>

        <button
          onClick={() => setScreen("editProfile")}
          className="mt-5 bg-[#F5DFD9] text-[#7B1F2B] px-5 py-2 rounded-xl text-sm font-semibold"
        >
          ✏️ Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-8">
        <ProfileStat number={wishes.length} label="Wishes" />
        <ProfileStat number={circles.length} label="Circles" />
        <ProfileStat number={events.length} label="Events" />
      </div>

      <div className="space-y-3 mt-8">
        <button
          onClick={() => setScreen("wishes")}
          className="w-full text-left border border-[#EADDD8] bg-white rounded-2xl px-4 py-4 text-[#301C1E]"
        >
          ❤️ My Wishlist
        </button>

        <button
          onClick={() => setScreen("circles")}
          className="w-full text-left border border-[#EADDD8] bg-white rounded-2xl px-4 py-4 text-[#301C1E]"
        >
          👥 My Circles
        </button>

        <button
          onClick={() => setScreen("events")}
          className="w-full text-left border border-[#EADDD8] bg-white rounded-2xl px-4 py-4 text-[#301C1E]"
        >
          🎁 Gift Exchanges
        </button>
      </div>

      <div className="mt-7 bg-[#FFF8F5] rounded-2xl p-4">
        <p className="text-sm font-medium text-[#301C1E]">
          🔐 Privacy first
        </p>

        <p className="text-xs text-[#786A68] mt-2 leading-5">
          Gifts reserved by your friends remain hidden from you so your
          surprises stay surprises.
        </p>
      </div>

      <button
        onClick={logoutUser}
        className="w-full mt-7 border border-[#7B1F2B] text-[#7B1F2B] py-4 rounded-2xl font-semibold"
      >
        Logout
      </button>
    </AppShell>
  );
}


// =====================================================
// EDIT PROFILE
// =====================================================

export function EditProfileScreen({
  screen,
  setScreen,
  currentUser,
  updateProfile,
}) {
  const [name, setName] = useState(currentUser.name);

  const [username, setUsername] = useState(
    currentUser.username
  );

  const [email, setEmail] = useState(
    currentUser.email
  );

  const [birthday, setBirthday] = useState(
    currentUser.birthday
  );

  const [error, setError] = useState("");


  function handleSave(event) {
    event.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }

    if (username.includes(" ")) {
      setError("Username cannot contain spaces.");
      return;
    }

    if (
      !email.trim() ||
      !email.includes("@")
    ) {
      setError("Please enter a valid email.");
      return;
    }

    if (!birthday) {
      setError("Please enter your birthday.");
      return;
    }


    updateProfile({
      ...currentUser,
      name: name.trim(),
      username: username
        .trim()
        .toLowerCase(),
      email: email.trim(),
      birthday,
    });


    setScreen("profile");
  }


  return (
    <AppShell
      screen={screen}
      setScreen={setScreen}
      showBack={true}
      backTo="profile"
      title="Back to Profile"
    >
      <div>
        <h1 className="text-3xl font-semibold text-[#301C1E]">
          Edit Profile ✨
        </h1>

        <p className="text-sm text-[#786A68] mt-2">
          Keep your WishCircle profile up to date.
        </p>


        <div className="mt-7 flex justify-center">
          <div className="w-24 h-24 bg-[#7B1F2B] text-white rounded-full flex items-center justify-center text-4xl font-semibold">
            {name
              ? name.charAt(0).toUpperCase()
              : "?"}
          </div>
        </div>


        <form
          onSubmit={handleSave}
          className="mt-8 space-y-5"
        >
          <ProfileField
            label="Name"
            value={name}
            setValue={setName}
            placeholder="Your name"
            clearError={() => setError("")}
          />

          <ProfileField
            label="Username"
            value={username}
            setValue={setUsername}
            placeholder="username"
            clearError={() => setError("")}
          />

          <ProfileField
            label="Email"
            value={email}
            setValue={setEmail}
            placeholder="you@example.com"
            type="email"
            clearError={() => setError("")}
          />


          <div>
            <label className="text-sm font-medium text-[#301C1E]">
              Birthday
            </label>

            <input
              value={birthday}
              onChange={(event) => {
                setBirthday(event.target.value);
                setError("");
              }}
              type="date"
              className="w-full mt-2 px-4 py-4 bg-white border border-[#EADDD8] rounded-2xl outline-none focus:border-[#7B1F2B]"
            />
          </div>


          {error && (
            <div className="bg-[#FFF0EE] text-[#9B2636] text-sm rounded-2xl px-4 py-3">
              {error}
            </div>
          )}


          <button
            type="submit"
            className="w-full bg-[#7B1F2B] text-white py-4 rounded-2xl font-semibold"
          >
            Save Changes
          </button>


          <button
            type="button"
            onClick={() => setScreen("profile")}
            className="w-full border border-[#EADDD8] text-[#786A68] py-4 rounded-2xl"
          >
            Cancel
          </button>
        </form>
      </div>
    </AppShell>
  );
}


// =====================================================
// HELPERS
// =====================================================

function ProfileField({
  label,
  value,
  setValue,
  placeholder,
  type = "text",
  clearError,
}) {
  return (
    <div>
      <label className="text-sm font-medium text-[#301C1E]">
        {label}
      </label>

      <input
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          clearError();
        }}
        type={type}
        placeholder={placeholder}
        className="w-full mt-2 px-4 py-4 bg-white border border-[#EADDD8] rounded-2xl outline-none focus:border-[#7B1F2B]"
      />
    </div>
  );
}


function ProfileStat({
  number,
  label,
}) {
  return (
    <div className="bg-[#FFF8F5] rounded-2xl p-3 text-center">
      <p className="text-xl font-semibold text-[#7B1F2B]">
        {number}
      </p>

      <p className="text-[10px] text-[#786A68] mt-1">
        {label}
      </p>
    </div>
  );
}


function formatBirthday(birthday) {
  if (!birthday) return "Not added";

  if (!birthday.includes("-")) {
    return birthday;
  }

  const parts = birthday.split("-");

  if (parts.length !== 3) {
    return birthday;
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${Number(parts[2])} ${
    months[Number(parts[1]) - 1]
  }`;
}