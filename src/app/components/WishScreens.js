"use client";

import { useState } from "react";
import AppShell from "./AppShell";


// =====================================================
// MY WISHES SCREEN
// =====================================================

export function WishesScreen({
  screen,
  setScreen,
  wishes,
  deleteWish,
}) {
  return (
    <AppShell
      screen={screen}
      setScreen={setScreen}
      showBack={true}
      backTo="home"
      title="Back to Home"
    >
      <div>
        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-[#301C1E]">
              My Wishes ❤️
            </h1>

            <p className="text-[#786A68] mt-2 text-sm">
              The little things you'd love to receive.
            </p>
          </div>

          <div className="text-3xl">
            ✨
          </div>
        </div>


        {/* WISHLIST CARD */}

        <div className="mt-7 bg-[#F5DFD9] rounded-3xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-[#7B1F2B] font-medium">
                🎂 Birthday Wishlist
              </p>

              <h2 className="text-xl font-semibold text-[#301C1E] mt-2">
                Things I'd love
              </h2>

              <p className="text-sm text-[#786A68] mt-1">
                {wishes.length} {wishes.length === 1 ? "wish" : "wishes"}
              </p>
            </div>

            <div className="text-4xl">
              🎀
            </div>

          </div>
        </div>


        {/* ADD WISH BUTTON */}

        <button
          onClick={() => setScreen("addWish")}
          className="w-full mt-5 bg-[#7B1F2B] text-white py-4 rounded-2xl font-semibold hover:bg-[#681923] transition"
        >
          + Add a Wish
        </button>


        {/* WISH LIST */}

        <div className="mt-7">

          <div className="flex items-center justify-between mb-4">

            <h2 className="font-semibold text-[#301C1E]">
              My Wishlist
            </h2>

            <p className="text-xs text-[#786A68]">
              {wishes.length} items
            </p>

          </div>


          {wishes.length === 0 ? (

            // EMPTY STATE

            <div className="border border-dashed border-[#D9C7C1] rounded-3xl px-6 py-10 text-center">

              <div className="text-5xl">
                🎁
              </div>

              <h3 className="font-semibold text-[#301C1E] mt-4">
                Your wishlist is empty
              </h3>

              <p className="text-sm text-[#786A68] mt-2">
                Add something you'd love and it will appear here.
              </p>

              <button
                onClick={() => setScreen("addWish")}
                className="mt-5 text-[#7B1F2B] font-semibold text-sm"
              >
                Add your first wish →
              </button>

            </div>

          ) : (

            // WISH ITEMS

            <div className="space-y-3">

              {wishes.map((wish) => (
                <WishCard
                  key={wish.id}
                  wish={wish}
                  deleteWish={deleteWish}
                />
              ))}

            </div>

          )}

        </div>

      </div>
    </AppShell>
  );
}


// =====================================================
// ADD WISH SCREEN
// =====================================================

export function AddWishScreen({
  screen,
  setScreen,
  addWish,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [note, setNote] = useState("");
  const [priority, setPriority] = useState("Would love");
  const [error, setError] = useState("");


  function handleAddWish(event) {
    event.preventDefault();

    // Item name is compulsory
    if (!name.trim()) {
      setError("Please enter the name of your wish.");
      return;
    }

    const newWish = {
      id: Date.now(),
      name: name.trim(),
      price: price.trim(),
      link: link.trim(),
      note: note.trim(),
      priority,
    };

    addWish(newWish);

    // Return to wishlist after adding
    setScreen("wishes");
  }


  return (
    <AppShell
      screen={screen}
      setScreen={setScreen}
      showBack={true}
      backTo="wishes"
      title="Back to My Wishes"
    >
      <div>

        <h1 className="text-3xl font-semibold text-[#301C1E]">
          Add a Wish ✨
        </h1>

        <p className="text-sm text-[#786A68] mt-2">
          Add something you'd genuinely love to receive.
        </p>


        <form
          onSubmit={handleAddWish}
          className="mt-7 space-y-5"
        >

          {/* ITEM NAME */}

          <div>
            <label className="text-sm font-medium text-[#301C1E]">
              What do you wish for? *
            </label>

            <input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
              }}
              type="text"
              placeholder="Example: Rare Beauty Blush"
              className="w-full mt-2 px-4 py-4 bg-white border border-[#EADDD8] rounded-2xl outline-none text-[#301C1E] placeholder:text-[#A99B98] focus:border-[#7B1F2B]"
            />
          </div>


          {/* PRICE */}

          <div>
            <label className="text-sm font-medium text-[#301C1E]">
              Approximate price
            </label>

            <div className="relative mt-2">

              <span className="absolute left-4 top-4 text-[#786A68]">
                ₹
              </span>

              <input
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                type="text"
                inputMode="numeric"
                placeholder="2500"
                className="w-full pl-9 pr-4 py-4 bg-white border border-[#EADDD8] rounded-2xl outline-none text-[#301C1E] placeholder:text-[#A99B98] focus:border-[#7B1F2B]"
              />

            </div>
          </div>


          {/* PRODUCT LINK */}

          <div>
            <label className="text-sm font-medium text-[#301C1E]">
              Product link
            </label>

            <input
              value={link}
              onChange={(event) => setLink(event.target.value)}
              type="url"
              placeholder="Paste a shopping link"
              className="w-full mt-2 px-4 py-4 bg-white border border-[#EADDD8] rounded-2xl outline-none text-[#301C1E] placeholder:text-[#A99B98] focus:border-[#7B1F2B]"
            />

            <p className="text-[11px] text-[#9A8B88] mt-2">
              Optional — add a link so friends can find the exact item.
            </p>
          </div>


          {/* PRIORITY */}

          <div>
            <label className="text-sm font-medium text-[#301C1E]">
              How much do you want it?
            </label>

            <div className="grid grid-cols-3 gap-2 mt-3">

              {[
                ["Nice to have", "♡"],
                ["Would love", "♥"],
                ["Dream wish", "✨"],
              ].map(([option, icon]) => (

                <button
                  key={option}
                  type="button"
                  onClick={() => setPriority(option)}
                  className={`rounded-2xl px-2 py-3 text-xs border transition ${
                    priority === option
                      ? "bg-[#F5DFD9] border-[#7B1F2B] text-[#7B1F2B] font-semibold"
                      : "bg-white border-[#EADDD8] text-[#786A68]"
                  }`}
                >
                  <div className="text-lg mb-1">
                    {icon}
                  </div>

                  {option}
                </button>

              ))}

            </div>
          </div>


          {/* NOTE */}

          <div>
            <label className="text-sm font-medium text-[#301C1E]">
              Note
            </label>

            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Example: I'd love the shade Happy!"
              rows="3"
              className="w-full mt-2 px-4 py-4 bg-white border border-[#EADDD8] rounded-2xl outline-none resize-none text-[#301C1E] placeholder:text-[#A99B98] focus:border-[#7B1F2B]"
            />
          </div>


          {/* ERROR */}

          {error && (
            <div className="bg-[#FFF0EE] text-[#9B2636] text-sm rounded-2xl px-4 py-3">
              {error}
            </div>
          )}


          {/* SAVE */}

          <button
            type="submit"
            className="w-full bg-[#7B1F2B] text-white py-4 rounded-2xl font-semibold hover:bg-[#681923] transition"
          >
            Add to My Wishlist
          </button>


          {/* CANCEL */}

          <button
            type="button"
            onClick={() => setScreen("wishes")}
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
// INDIVIDUAL WISH CARD
// =====================================================

function WishCard({ wish, deleteWish }) {

  function getWishEmoji(priority) {
    if (priority === "Dream wish") {
      return "✨";
    }

    if (priority === "Would love") {
      return "💗";
    }

    return "🎁";
  }


  return (
    <div className="border border-[#EADDD8] bg-white rounded-2xl p-4">

      <div className="flex gap-3">

        <div className="w-12 h-12 shrink-0 bg-[#FFF8F5] rounded-xl flex items-center justify-center text-2xl">
          {getWishEmoji(wish.priority)}
        </div>


        <div className="flex-1 min-w-0">

          <div className="flex justify-between gap-3">

            <div>

              <p className="font-semibold text-[#301C1E]">
                {wish.name}
              </p>

              {wish.price && (
                <p className="text-sm text-[#7B1F2B] font-medium mt-1">
                  ₹{wish.price}
                </p>
              )}

            </div>


            <button
              onClick={() => deleteWish(wish.id)}
              className="text-[#A99B98] hover:text-[#7B1F2B] text-lg"
              title="Delete wish"
            >
              ×
            </button>

          </div>


          <span className="inline-block mt-3 bg-[#FFF8F5] text-[#786A68] text-[10px] px-3 py-1 rounded-full">
            {wish.priority}
          </span>


          {wish.note && (
            <p className="text-xs text-[#786A68] mt-3">
              “{wish.note}”
            </p>
          )}


          {wish.link && (
            <a
              href={wish.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs text-[#7B1F2B] font-semibold mt-3"
            >
              View item ↗
            </a>
          )}

        </div>

      </div>

    </div>
  );
}