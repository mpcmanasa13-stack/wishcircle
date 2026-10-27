"use client";

import { useState } from "react";
import AppShell from "./AppShell";


// =====================================================
// CIRCLES MAIN SCREEN
// =====================================================

export function CirclesScreen({
  screen,
  setScreen,
  circles,
  setSelectedCircle,
}) {
  function openCircle(circle) {
    setSelectedCircle(circle);
    setScreen("circleDetails");
  }

  return (
    <AppShell
      screen={screen}
      setScreen={setScreen}
      showBack={true}
      backTo="home"
      title="Back to Home"
    >
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#301C1E]">
              My Circles 👥
            </h1>

            <p className="text-sm text-[#786A68] mt-2">
              Your people, all in one place.
            </p>
          </div>

          <div className="text-3xl">💌</div>
        </div>

        <button
          onClick={() => setScreen("createCircle")}
          className="w-full mt-7 bg-[#7B1F2B] text-white py-4 rounded-2xl font-semibold"
        >
          + Create a Circle
        </button>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-[#301C1E]">
              Your Circles
            </h2>

            <span className="text-xs text-[#786A68]">
              {circles.length}
            </span>
          </div>

          {circles.length === 0 ? (
            <div className="border border-dashed border-[#D9C7C1] rounded-3xl p-8 text-center">
              <div className="text-5xl">👥</div>

              <h3 className="font-semibold text-[#301C1E] mt-4">
                No circles yet
              </h3>

              <p className="text-sm text-[#786A68] mt-2">
                Create a circle for your friends or family.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {circles.map((circle) => (
                <button
                  key={circle.id}
                  onClick={() => openCircle(circle)}
                  className="w-full text-left border border-[#EADDD8] bg-white rounded-2xl p-4 flex items-center"
                >
                  <div className="w-14 h-14 bg-[#F9ECE8] rounded-2xl flex items-center justify-center text-2xl">
                    {circle.emoji}
                  </div>

                  <div className="ml-4 flex-1">
                    <p className="font-semibold text-[#301C1E]">
                      {circle.name}
                    </p>

                    <p className="text-xs text-[#786A68] mt-1">
                      {circle.members.length}{" "}
                      {circle.members.length === 1
                        ? "member"
                        : "members"}
                    </p>
                  </div>

                  <span className="text-[#7B1F2B] text-xl">
                    →
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}


// =====================================================
// CREATE CIRCLE
// =====================================================

export function CreateCircleScreen({
  screen,
  setScreen,
  addCircle,
}) {
  const [circleName, setCircleName] = useState("");
  const [emoji, setEmoji] = useState("💗");
  const [error, setError] = useState("");

  const emojis = [
    "💗",
    "🏠",
    "🎓",
    "✨",
    "🎂",
    "🌷",
  ];

  function handleCreate(event) {
    event.preventDefault();

    if (!circleName.trim()) {
      setError("Please give your circle a name.");
      return;
    }

    const newCircle = {
      id: Date.now(),
      name: circleName.trim(),
      emoji,
      members: [],
    };

    addCircle(newCircle);
    setScreen("circles");
  }

  return (
    <AppShell
      screen={screen}
      setScreen={setScreen}
      showBack={true}
      backTo="circles"
      title="Back to Circles"
    >
      <h1 className="text-3xl font-semibold text-[#301C1E]">
        Create a Circle
      </h1>

      <p className="text-sm text-[#786A68] mt-2">
        Make a private gifting group for people you know.
      </p>

      <form onSubmit={handleCreate} className="mt-8">
        <label className="text-sm font-medium text-[#301C1E]">
          Circle name *
        </label>

        <input
          value={circleName}
          onChange={(event) => {
            setCircleName(event.target.value);
            setError("");
          }}
          type="text"
          placeholder="Example: Besties"
          className="w-full mt-2 px-4 py-4 border border-[#EADDD8] rounded-2xl bg-white outline-none focus:border-[#7B1F2B]"
        />

        <div className="mt-7">
          <label className="text-sm font-medium text-[#301C1E]">
            Choose an icon
          </label>

          <div className="grid grid-cols-6 gap-2 mt-3">
            {emojis.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setEmoji(item)}
                className={`aspect-square rounded-xl text-xl border ${
                  emoji === item
                    ? "bg-[#F5DFD9] border-[#7B1F2B]"
                    : "bg-white border-[#EADDD8]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 bg-[#FFF8F5] rounded-2xl p-4">
          <p className="text-sm font-medium text-[#301C1E]">
            👤 Members
          </p>

          <p className="text-xs text-[#786A68] mt-2">
            Add registered WishCircle users after creating your circle.
          </p>
        </div>

        {error && (
          <p className="mt-5 bg-[#FFF0EE] text-[#9B2636] px-4 py-3 rounded-2xl text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-7 bg-[#7B1F2B] text-white py-4 rounded-2xl font-semibold"
        >
          Create Circle
        </button>

        <button
          type="button"
          onClick={() => setScreen("circles")}
          className="w-full mt-3 border border-[#EADDD8] text-[#786A68] py-4 rounded-2xl"
        >
          Cancel
        </button>
      </form>
    </AppShell>
  );
}


// =====================================================
// CIRCLE DETAILS
// =====================================================

export function CircleDetailsScreen({
  screen,
  setScreen,
  selectedCircle,
  setSelectedFriend,
}) {
  if (!selectedCircle) {
    return null;
  }

  function openFriend(friend) {
    setSelectedFriend(friend);
    setScreen("friendProfile");
  }

  return (
    <AppShell
      screen={screen}
      setScreen={setScreen}
      showBack={true}
      backTo="circles"
      title="Back to Circles"
    >
      <div className="text-center">
        <div className="w-20 h-20 mx-auto bg-[#F5DFD9] rounded-3xl flex items-center justify-center text-4xl">
          {selectedCircle.emoji}
        </div>

        <h1 className="text-3xl font-semibold text-[#301C1E] mt-4">
          {selectedCircle.name}
        </h1>

        <p className="text-sm text-[#786A68] mt-2">
          {selectedCircle.members.length}{" "}
          {selectedCircle.members.length === 1
            ? "member"
            : "members"}
        </p>
      </div>

      <button
        onClick={() => setScreen("addFriend")}
        className="w-full mt-7 bg-[#7B1F2B] text-white py-4 rounded-2xl font-semibold"
      >
        + Add Friend
      </button>

      <div className="mt-8">
        <h2 className="font-semibold text-[#301C1E]">
          Members
        </h2>

        {selectedCircle.members.length === 0 ? (
          <div className="mt-4 border border-dashed border-[#D9C7C1] rounded-3xl p-8 text-center">
            <div className="text-4xl">💌</div>

            <h3 className="font-semibold text-[#301C1E] mt-4">
              This circle is waiting for friends
            </h3>

            <p className="text-sm text-[#786A68] mt-2">
              Add people who already have a WishCircle account.
            </p>
          </div>
        ) : (
          <div className="space-y-3 mt-4">
            {selectedCircle.members.map((friend) => (
              <button
                key={friend.id}
                onClick={() => openFriend(friend)}
                className="w-full flex items-center border border-[#EADDD8] bg-white rounded-2xl p-4 text-left"
              >
                <div className="w-12 h-12 rounded-full bg-[#F5DFD9] flex items-center justify-center text-[#7B1F2B] font-semibold">
                  {friend.name.charAt(0).toUpperCase()}
                </div>

                <div className="ml-4 flex-1">
                  <p className="font-semibold text-[#301C1E]">
                    {friend.name}
                  </p>

                  <p className="text-xs text-[#786A68] mt-1">
                    @{friend.username}
                  </p>
                </div>

                <span className="text-[#7B1F2B]">
                  →
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}


// =====================================================
// ADD FRIEND
// =====================================================

export function AddFriendScreen({
  screen,
  setScreen,
  registeredUsers,
  selectedCircle,
  addFriendToCircle,
}) {
  const [search, setSearch] = useState("");

  if (!selectedCircle) {
    return null;
  }

  const searchText =
    search.toLowerCase().trim();

  const results =
    registeredUsers.filter((user) => {
      if (!searchText) {
        return false;
      }

      return (
        user.name
          .toLowerCase()
          .includes(searchText) ||
        user.username
          .toLowerCase()
          .includes(searchText)
      );
    });

  function alreadyMember(userId) {
    return selectedCircle.members.some(
      (member) => member.id === userId
    );
  }

  return (
    <AppShell
      screen={screen}
      setScreen={setScreen}
      showBack={true}
      backTo="circleDetails"
      title={`Back to ${selectedCircle.name}`}
    >
      <h1 className="text-3xl font-semibold text-[#301C1E]">
        Add a Friend
      </h1>

      <p className="text-sm text-[#786A68] mt-2">
        Search for someone who already has a WishCircle account.
      </p>

      <input
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
        type="text"
        placeholder="Search name or username..."
        className="w-full mt-7 px-4 py-4 bg-white border border-[#EADDD8] rounded-2xl outline-none focus:border-[#7B1F2B]"
      />

      {!searchText && (
        <div className="mt-7 bg-[#FFF8F5] rounded-2xl p-5">
          <p className="font-medium text-[#301C1E]">
            🔎 Find your people
          </p>

          <p className="text-xs text-[#786A68] mt-2 leading-5">
            Search by name or WishCircle username.
          </p>
        </div>
      )}

      {searchText &&
        results.length === 0 && (
          <div className="mt-7 text-center border border-dashed border-[#D9C7C1] rounded-3xl p-8">
            <div className="text-4xl">
              🕵️
            </div>

            <p className="font-semibold text-[#301C1E] mt-3">
              No user found
            </p>

            <p className="text-sm text-[#786A68] mt-2">
              They may not have a WishCircle account yet.
            </p>
          </div>
        )}

      <div className="space-y-3 mt-6">
        {results.map((user) => {
          const added =
            alreadyMember(user.id);

          return (
            <div
              key={user.id}
              className="border border-[#EADDD8] bg-white rounded-2xl p-4 flex items-center"
            >
              <div className="w-12 h-12 bg-[#F5DFD9] rounded-full flex items-center justify-center text-[#7B1F2B] font-semibold">
                {user.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="ml-4 flex-1">
                <p className="font-semibold text-[#301C1E]">
                  {user.name}
                </p>

                <p className="text-xs text-[#786A68] mt-1">
                  @{user.username}
                </p>
              </div>

              <button
                disabled={added}
                onClick={() =>
                  addFriendToCircle(user)
                }
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                  added
                    ? "bg-[#F3EFED] text-[#9A8B88]"
                    : "bg-[#7B1F2B] text-white"
                }`}
              >
                {added ? "Added" : "Add"}
              </button>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}


// =====================================================
// FRIEND PROFILE + SECRET RESERVATION
// =====================================================

export function FriendProfileScreen({
  screen,
  setScreen,
  selectedFriend,
  reservations,
  reserveGift,
  cancelReservation,
}) {
  if (!selectedFriend) {
    return null;
  }

  return (
    <AppShell
      screen={screen}
      setScreen={setScreen}
      showBack={true}
      backTo="circleDetails"
      title="Back to Circle"
    >
      <div className="text-center">
        <div className="w-20 h-20 mx-auto bg-[#7B1F2B] text-white rounded-full flex items-center justify-center text-3xl font-semibold">
          {selectedFriend.name
            .charAt(0)
            .toUpperCase()}
        </div>

        <h1 className="text-2xl font-semibold text-[#301C1E] mt-4">
          {selectedFriend.name}
        </h1>

        <p className="text-sm text-[#786A68] mt-1">
          @{selectedFriend.username}
        </p>

        <p className="text-sm text-[#786A68] mt-2">
          🎂 {selectedFriend.birthday}
        </p>
      </div>

      <div className="mt-7 bg-[#F9ECE8] rounded-2xl p-4">
        <p className="font-semibold text-[#301C1E] text-sm">
          🤫 Secret gifting
        </p>

        <p className="text-xs text-[#786A68] mt-2 leading-5">
          Reserved gifts are visible to other friends, but{" "}
          {selectedFriend.name} won't be told which gifts
          have been reserved.
        </p>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-[#301C1E]">
            ❤️ {selectedFriend.name}'s Wishlist
          </h2>

          <span className="text-xs text-[#786A68]">
            {selectedFriend.wishes.length} items
          </span>
        </div>

        <div className="space-y-3 mt-4">
          {selectedFriend.wishes.map(
            (wish) => {
              const reservation =
                reservations.find(
                  (item) =>
                    item.wishId === wish.id &&
                    item.ownerId ===
                      selectedFriend.id
                );

              const reserved =
                Boolean(reservation);

              return (
                <div
                  key={wish.id}
                  className={`border rounded-2xl p-4 ${
                    reserved
                      ? "border-[#D9C7C1] bg-[#FFF8F5]"
                      : "border-[#EADDD8] bg-white"
                  }`}
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 shrink-0 bg-[#F9ECE8] rounded-xl flex items-center justify-center text-2xl">
                      🎁
                    </div>

                    <div className="ml-3 flex-1">
                      <p className="font-semibold text-[#301C1E]">
                        {wish.name}
                      </p>

                      <p className="text-sm text-[#7B1F2B] mt-1">
                        ₹{wish.price}
                      </p>

                      {reserved && (
                        <div className="mt-2">
                          <span className="inline-block bg-[#F5DFD9] text-[#7B1F2B] text-[10px] font-semibold px-3 py-1 rounded-full">
                            ✓ Reserved
                          </span>

                          <p className="text-[10px] text-[#786A68] mt-2">
                            Reserved by you
                          </p>
                        </div>
                      )}
                    </div>

                    {!reserved ? (
                      <button
                        onClick={() =>
                          reserveGift(
                            selectedFriend,
                            wish
                          )
                        }
                        className="bg-[#7B1F2B] text-white text-xs px-3 py-2 rounded-xl"
                      >
                        Reserve
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          cancelReservation(
                            selectedFriend.id,
                            wish.id
                          )
                        }
                        className="border border-[#D9C7C1] text-[#786A68] text-[10px] px-3 py-2 rounded-xl"
                      >
                        Undo
                      </button>
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </AppShell>
  );
}