"use client";

import { useState } from "react";
import AppShell from "./AppShell";


// =====================================================
// EVENTS HOME
// =====================================================

export function EventsScreen({
  screen,
  setScreen,
  events,
  setSelectedEvent,
}) {
  function openEvent(event) {
    setSelectedEvent(event);
    setScreen("eventDetails");
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
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-semibold text-[#301C1E]">
              Gift Events 🎁
            </h1>

            <p className="text-sm text-[#786A68] mt-2">
              Secret exchanges without ruining the surprise.
            </p>
          </div>

          <div className="text-3xl">
            ✨
          </div>
        </div>


        <button
          onClick={() => setScreen("createEvent")}
          className="w-full mt-7 bg-[#7B1F2B] text-white py-4 rounded-2xl font-semibold"
        >
          + Create Gift Exchange
        </button>


        <div className="mt-8">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-[#301C1E]">
              Your Events
            </h2>

            <span className="text-xs text-[#786A68]">
              {events.length}
            </span>
          </div>


          {events.length === 0 ? (
            <div className="mt-4 border border-dashed border-[#D9C7C1] rounded-3xl p-8 text-center">
              <div className="text-5xl">
                🎄
              </div>

              <h3 className="font-semibold text-[#301C1E] mt-4">
                No gift exchanges yet
              </h3>

              <p className="text-sm text-[#786A68] mt-2 leading-5">
                Create an event, choose participants and let
                WishCircle secretly assign everyone a person.
              </p>
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {events.map((event) => (
                <button
                  key={event.id}
                  onClick={() => openEvent(event)}
                  className="w-full text-left border border-[#EADDD8] bg-white rounded-2xl p-5"
                >
                  <div className="flex items-start">
                    <div className="w-14 h-14 bg-[#F9ECE8] rounded-2xl flex items-center justify-center text-3xl">
                      🎁
                    </div>

                    <div className="ml-4 flex-1">
                      <p className="font-semibold text-[#301C1E]">
                        {event.name}
                      </p>

                      <p className="text-xs text-[#786A68] mt-2">
                        📅 {event.date}
                      </p>

                      <p className="text-xs text-[#786A68] mt-1">
                        💰 ₹{event.minBudget} – ₹{event.maxBudget}
                      </p>

                      <p className="text-xs text-[#786A68] mt-1">
                        👥 {event.participants.length} participants
                      </p>
                    </div>

                    <span className="text-[#7B1F2B]">
                      →
                    </span>
                  </div>


                  <div className="mt-4">
                    {event.drawComplete ? (
                      <span className="bg-[#F5DFD9] text-[#7B1F2B] text-[10px] font-semibold px-3 py-1 rounded-full">
                        ✓ Names Drawn
                      </span>
                    ) : (
                      <span className="bg-[#FFF8F5] text-[#786A68] text-[10px] font-semibold px-3 py-1 rounded-full">
                        Waiting for draw
                      </span>
                    )}
                  </div>
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
// CREATE EVENT
// =====================================================

export function CreateEventScreen({
  screen,
  setScreen,
  circles,
  addEvent,
}) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [circleId, setCircleId] = useState("");
  const [error, setError] = useState("");


  function handleCreate(event) {
    event.preventDefault();

    if (!name.trim()) {
      setError("Please enter an event name.");
      return;
    }

    if (!date) {
      setError("Please choose the gift exchange date.");
      return;
    }

    if (!circleId) {
      setError("Please choose a circle.");
      return;
    }

    const circle = circles.find(
      (item) => String(item.id) === circleId
    );

    if (!circle) {
      setError("Please choose a valid circle.");
      return;
    }

    if (circle.members.length < 2) {
      setError(
        "Add at least 2 friends to this circle before creating an exchange."
      );
      return;
    }


    const participants = [
      {
        id: "current-user",
        name: "Manasa",
        username: "manasa",
        birthday: "13 August",
        wishes: [],
      },
      ...circle.members,
    ];


    const newEvent = {
      id: Date.now(),
      name: name.trim(),
      date,
      minBudget: minBudget || "500",
      maxBudget: maxBudget || "1000",
      circleId: circle.id,
      circleName: circle.name,
      participants,
      assignments: [],
      drawComplete: false,
    };


    addEvent(newEvent);

    setScreen("events");
  }


  return (
    <AppShell
      screen={screen}
      setScreen={setScreen}
      showBack={true}
      backTo="events"
      title="Back to Events"
    >
      <div>
        <h1 className="text-3xl font-semibold text-[#301C1E]">
          Create Exchange 🎁
        </h1>

        <p className="text-sm text-[#786A68] mt-2">
          Set up your Secret Santa style gift exchange.
        </p>


        <form
          onSubmit={handleCreate}
          className="mt-7 space-y-5"
        >
          <div>
            <label className="text-sm font-medium text-[#301C1E]">
              Event name *
            </label>

            <input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
              }}
              placeholder="Example: Christmas Besties"
              className="w-full mt-2 px-4 py-4 bg-white border border-[#EADDD8] rounded-2xl outline-none focus:border-[#7B1F2B]"
            />
          </div>


          <div>
            <label className="text-sm font-medium text-[#301C1E]">
              Gift exchange date *
            </label>

            <input
              value={date}
              onChange={(event) => setDate(event.target.value)}
              type="date"
              className="w-full mt-2 px-4 py-4 bg-white border border-[#EADDD8] rounded-2xl outline-none focus:border-[#7B1F2B]"
            />
          </div>


          <div>
            <label className="text-sm font-medium text-[#301C1E]">
              Choose circle *
            </label>

            <select
              value={circleId}
              onChange={(event) => {
                setCircleId(event.target.value);
                setError("");
              }}
              className="w-full mt-2 px-4 py-4 bg-white border border-[#EADDD8] rounded-2xl outline-none"
            >
              <option value="">
                Select a circle
              </option>

              {circles.map((circle) => (
                <option
                  key={circle.id}
                  value={circle.id}
                >
                  {circle.emoji} {circle.name} ({circle.members.length} friends)
                </option>
              ))}
            </select>
          </div>


          <div>
            <label className="text-sm font-medium text-[#301C1E]">
              Gift budget
            </label>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="relative">
                <span className="absolute left-4 top-4 text-[#786A68]">
                  ₹
                </span>

                <input
                  value={minBudget}
                  onChange={(event) =>
                    setMinBudget(event.target.value)
                  }
                  inputMode="numeric"
                  placeholder="500"
                  className="w-full pl-9 pr-3 py-4 bg-white border border-[#EADDD8] rounded-2xl outline-none"
                />
              </div>


              <div className="relative">
                <span className="absolute left-4 top-4 text-[#786A68]">
                  ₹
                </span>

                <input
                  value={maxBudget}
                  onChange={(event) =>
                    setMaxBudget(event.target.value)
                  }
                  inputMode="numeric"
                  placeholder="1000"
                  className="w-full pl-9 pr-3 py-4 bg-white border border-[#EADDD8] rounded-2xl outline-none"
                />
              </div>
            </div>
          </div>


          <div className="bg-[#F9ECE8] rounded-2xl p-4">
            <p className="font-medium text-sm text-[#301C1E]">
              🔐 Private assignments
            </p>

            <p className="text-xs text-[#786A68] mt-2 leading-5">
              Each participant will receive exactly one person.
              Nobody will be assigned themselves.
            </p>
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
            Create Gift Exchange
          </button>


          <button
            type="button"
            onClick={() => setScreen("events")}
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
// EVENT DETAILS
// =====================================================

export function EventDetailsScreen({
  screen,
  setScreen,
  selectedEvent,
  drawNames,
}) {
  if (!selectedEvent) {
    return null;
  }


  const myAssignment =
    selectedEvent.assignments.find(
      (assignment) =>
        assignment.giverId === "current-user"
    );


  return (
    <AppShell
      screen={screen}
      setScreen={setScreen}
      showBack={true}
      backTo="events"
      title="Back to Events"
    >
      <div>
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-[#F5DFD9] rounded-3xl flex items-center justify-center text-4xl">
            🎁
          </div>

          <h1 className="text-2xl font-semibold text-[#301C1E] mt-4">
            {selectedEvent.name}
          </h1>

          <p className="text-sm text-[#786A68] mt-2">
            {selectedEvent.circleName}
          </p>
        </div>


        <div className="grid grid-cols-2 gap-3 mt-7">
          <InfoCard
            emoji="📅"
            label="Date"
            value={selectedEvent.date}
          />

          <InfoCard
            emoji="💰"
            label="Budget"
            value={`₹${selectedEvent.minBudget} – ₹${selectedEvent.maxBudget}`}
          />
        </div>


        <div className="mt-7">
          <h2 className="font-semibold text-[#301C1E]">
            👥 Participants
          </h2>

          <div className="flex flex-wrap gap-2 mt-3">
            {selectedEvent.participants.map(
              (participant) => (
                <div
                  key={participant.id}
                  className="bg-[#FFF8F5] border border-[#EADDD8] rounded-full px-3 py-2 flex items-center"
                >
                  <div className="w-7 h-7 bg-[#F5DFD9] rounded-full flex items-center justify-center text-xs font-semibold text-[#7B1F2B]"
                  >
                    {participant.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <span className="text-xs text-[#301C1E] ml-2">
                    {participant.name}
                  </span>
                </div>
              )
            )}
          </div>
        </div>


        {!selectedEvent.drawComplete ? (
          <div className="mt-8">
            <div className="bg-[#F9ECE8] rounded-2xl p-5">
              <p className="font-semibold text-[#301C1E]">
                🎲 Ready to draw names?
              </p>

              <p className="text-xs text-[#786A68] mt-2 leading-5">
                WishCircle will randomly assign everyone
                exactly one person. Nobody can draw themselves.
              </p>
            </div>

            <button
              onClick={() =>
                drawNames(selectedEvent.id)
              }
              className="w-full mt-4 bg-[#7B1F2B] text-white py-4 rounded-2xl font-semibold"
            >
              Draw Names Secretly ✨
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <div className="bg-[#7B1F2B] text-white rounded-3xl p-6">
              <p className="text-sm opacity-80">
                🤫 Your secret person is...
              </p>

              {myAssignment ? (
                <>
                  <div className="w-16 h-16 mt-5 bg-white/15 rounded-full flex items-center justify-center text-2xl font-semibold">
                    {myAssignment.receiverName
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <h2 className="text-3xl font-semibold mt-4">
                    {myAssignment.receiverName}
                  </h2>

                  <p className="text-sm opacity-80 mt-2">
                    Find something they'll genuinely love.
                  </p>
                </>
              ) : (
                <p className="mt-4">
                  Assignment unavailable.
                </p>
              )}
            </div>


            {myAssignment &&
              myAssignment.receiverId !==
                "current-user" && (
                <button
                  onClick={() => {
                    setScreen("eventRecipient");
                  }}
                  className="w-full mt-4 border border-[#7B1F2B] text-[#7B1F2B] py-4 rounded-2xl font-semibold"
                >
                  View {myAssignment.receiverName}'s Wishlist →
                </button>
              )}


            <div className="mt-5 bg-[#FFF8F5] rounded-2xl p-4">
              <p className="text-sm font-medium text-[#301C1E]">
                🔐 Keep it secret
              </p>

              <p className="text-xs text-[#786A68] mt-2 leading-5">
                Only your own assignment is shown here.
                Don't spoil the surprise!
              </p>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}


// =====================================================
// ASSIGNED RECIPIENT WISHLIST
// =====================================================

export function EventRecipientScreen({
  screen,
  setScreen,
  selectedEvent,
  reservations,
  reserveGift,
  cancelReservation,
}) {
  if (!selectedEvent) {
    return null;
  }


  const assignment =
    selectedEvent.assignments.find(
      (item) =>
        item.giverId === "current-user"
    );


  if (!assignment) {
    return null;
  }


  const recipient =
    selectedEvent.participants.find(
      (participant) =>
        participant.id ===
        assignment.receiverId
    );


  if (!recipient) {
    return null;
  }


  return (
    <AppShell
      screen={screen}
      setScreen={setScreen}
      showBack={true}
      backTo="eventDetails"
      title="Back to Event"
    >
      <div className="text-center">
        <div className="w-20 h-20 mx-auto bg-[#7B1F2B] text-white rounded-full flex items-center justify-center text-3xl font-semibold">
          {recipient.name
            .charAt(0)
            .toUpperCase()}
        </div>

        <h1 className="text-2xl font-semibold text-[#301C1E] mt-4">
          {recipient.name}'s Wishlist
        </h1>

        <p className="text-sm text-[#786A68] mt-2">
          Your secret gift recipient 🤫
        </p>
      </div>


      {recipient.wishes &&
      recipient.wishes.length > 0 ? (
        <div className="space-y-3 mt-8">
          {recipient.wishes.map((wish) => {
            const reservation =
              reservations.find(
                (item) =>
                  item.ownerId ===
                    recipient.id &&
                  item.wishId === wish.id
              );

            const reserved =
              Boolean(reservation);


            return (
              <div
                key={wish.id}
                className="border border-[#EADDD8] rounded-2xl p-4 bg-white"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#F9ECE8] rounded-xl flex items-center justify-center text-2xl">
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
                      <span className="inline-block mt-2 bg-[#F5DFD9] text-[#7B1F2B] text-[10px] px-3 py-1 rounded-full font-semibold">
                        ✓ Reserved
                      </span>
                    )}
                  </div>


                  {!reserved ? (
                    <button
                      onClick={() =>
                        reserveGift(
                          recipient,
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
                          recipient.id,
                          wish.id
                        )
                      }
                      className="border border-[#EADDD8] text-[#786A68] text-xs px-3 py-2 rounded-xl"
                    >
                      Undo
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 border border-dashed border-[#D9C7C1] rounded-3xl p-8 text-center">
          <div className="text-5xl">
            🎁
          </div>

          <h3 className="font-semibold text-[#301C1E] mt-4">
            No wishes yet
          </h3>

          <p className="text-sm text-[#786A68] mt-2">
            {recipient.name} hasn't added anything to their
            wishlist yet.
          </p>
        </div>
      )}
    </AppShell>
  );
}


// =====================================================
// SMALL COMPONENT
// =====================================================

function InfoCard({
  emoji,
  label,
  value,
}) {
  return (
    <div className="bg-[#FFF8F5] rounded-2xl p-4">
      <div className="text-xl">
        {emoji}
      </div>

      <p className="text-[10px] text-[#786A68] mt-2">
        {label}
      </p>

      <p className="text-xs font-semibold text-[#301C1E] mt-1">
        {value}
      </p>
    </div>
  );
}