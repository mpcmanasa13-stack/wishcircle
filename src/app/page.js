"use client";

import { useEffect, useState } from "react";

import AppShell from "./components/AppShell";

import {
  SplashScreen,
  LoginScreen,
  SignupScreen,
} from "./components/AuthScreens";

import {
  WishesScreen,
  AddWishScreen,
} from "./components/WishScreens";

import {
  CirclesScreen,
  CreateCircleScreen,
  CircleDetailsScreen,
  AddFriendScreen,
  FriendProfileScreen,
} from "./components/CircleScreens";

import {
  EventsScreen,
  CreateEventScreen,
  EventDetailsScreen,
  EventRecipientScreen,
} from "./components/EventScreens";

import {
  ProfileScreen,
  EditProfileScreen,
} from "./components/ProfileScreens";


// =====================================================
// DEFAULT DATA
// =====================================================

const defaultUser = {
  id: "current-user",
  name: "Manasa",
  username: "manasa13",
  email: "manasa@example.com",
  birthday: "2005-08-13",
};


const defaultWishes = [
  {
    id: 1,
    name: "Vanilla Perfume",
    price: "2499",
    link: "",
    note: "Something warm and sweet.",
    priority: "Would love",
  },
  {
    id: 2,
    name: "Black Handbag",
    price: "1899",
    link: "",
    note: "",
    priority: "Nice to have",
  },
];


const registeredUsers = [
  {
    id: 101,
    name: "Riya",
    username: "riya21",
    birthday: "18 November",
    wishes: [
      {
        id: 1001,
        name: "Vanilla Perfume",
        price: "2499",
      },
      {
        id: 1002,
        name: "Silver Bracelet",
        price: "1599",
      },
      {
        id: 1003,
        name: "Mini Handbag",
        price: "1999",
      },
    ],
  },

  {
    id: 102,
    name: "Ananya",
    username: "ananya08",
    birthday: "2 December",
    wishes: [
      {
        id: 2001,
        name: "Lip Tint Set",
        price: "1299",
      },
      {
        id: 2002,
        name: "White Sneakers",
        price: "2999",
      },
    ],
  },

  {
    id: 103,
    name: "Sneha",
    username: "sneha16",
    birthday: "15 December",
    wishes: [
      {
        id: 3001,
        name: "Shoulder Bag",
        price: "1799",
      },
      {
        id: 3002,
        name: "Scented Candle Set",
        price: "899",
      },
    ],
  },

  {
    id: 104,
    name: "Aisha",
    username: "aisha07",
    birthday: "7 January",
    wishes: [
      {
        id: 4001,
        name: "Gold Hoop Earrings",
        price: "1499",
      },
      {
        id: 4002,
        name: "Makeup Pouch",
        price: "999",
      },
    ],
  },
];


// =====================================================
// MAIN APP
// =====================================================

export default function Home() {

  // =====================================================
  // NAVIGATION
  // =====================================================

  const [screen, setScreen] =
    useState("splash");


  // =====================================================
  // CURRENT USER
  // =====================================================

  const [currentUser, setCurrentUser] =
    useState(defaultUser);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);


  // =====================================================
  // APP DATA
  // =====================================================

  const [wishes, setWishes] =
    useState(defaultWishes);

  const [circles, setCircles] =
    useState([]);

  const [reservations, setReservations] =
    useState([]);

  const [events, setEvents] =
    useState([]);


  // =====================================================
  // SELECTED DATA
  // =====================================================

  const [
    selectedCircleId,
    setSelectedCircleId,
  ] = useState(null);


  const [
    selectedFriend,
    setSelectedFriend,
  ] = useState(null);


  const [
    selectedEventId,
    setSelectedEventId,
  ] = useState(null);


  // =====================================================
  // LOCAL STORAGE
  // =====================================================

  const [
    storageLoaded,
    setStorageLoaded,
  ] = useState(false);


  // =====================================================
  // LOAD SAVED DATA
  // =====================================================

  useEffect(() => {

    try {

      const savedUser =
        localStorage.getItem(
          "wishcircle-user"
        );


      const savedLogin =
        localStorage.getItem(
          "wishcircle-login"
        );


      const savedWishes =
        localStorage.getItem(
          "wishcircle-wishes"
        );


      const savedCircles =
        localStorage.getItem(
          "wishcircle-circles"
        );


      const savedReservations =
        localStorage.getItem(
          "wishcircle-reservations"
        );


      const savedEvents =
        localStorage.getItem(
          "wishcircle-events"
        );


      if (savedUser) {

        setCurrentUser(
          JSON.parse(savedUser)
        );

      }


      if (savedLogin === "true") {

        setIsLoggedIn(true);

        setScreen("home");

      }


      if (savedWishes) {

        setWishes(
          JSON.parse(savedWishes)
        );

      }


      if (savedCircles) {

        setCircles(
          JSON.parse(savedCircles)
        );

      }


      if (savedReservations) {

        setReservations(
          JSON.parse(
            savedReservations
          )
        );

      }


      if (savedEvents) {

        setEvents(
          JSON.parse(savedEvents)
        );

      }

    } catch (error) {

      console.error(
        "Could not load WishCircle:",
        error
      );

    }


    setStorageLoaded(true);

  }, []);


  // =====================================================
  // SAVE USER
  // =====================================================

  useEffect(() => {

    if (!storageLoaded) return;


    localStorage.setItem(
      "wishcircle-user",
      JSON.stringify(currentUser)
    );

  }, [
    currentUser,
    storageLoaded,
  ]);


  // =====================================================
  // SAVE LOGIN
  // =====================================================

  useEffect(() => {

    if (!storageLoaded) return;


    localStorage.setItem(
      "wishcircle-login",
      String(isLoggedIn)
    );

  }, [
    isLoggedIn,
    storageLoaded,
  ]);


  // =====================================================
  // SAVE WISHES
  // =====================================================

  useEffect(() => {

    if (!storageLoaded) return;


    localStorage.setItem(
      "wishcircle-wishes",
      JSON.stringify(wishes)
    );

  }, [
    wishes,
    storageLoaded,
  ]);


  // =====================================================
  // SAVE CIRCLES
  // =====================================================

  useEffect(() => {

    if (!storageLoaded) return;


    localStorage.setItem(
      "wishcircle-circles",
      JSON.stringify(circles)
    );

  }, [
    circles,
    storageLoaded,
  ]);


  // =====================================================
  // SAVE RESERVATIONS
  // =====================================================

  useEffect(() => {

    if (!storageLoaded) return;


    localStorage.setItem(
      "wishcircle-reservations",
      JSON.stringify(reservations)
    );

  }, [
    reservations,
    storageLoaded,
  ]);


  // =====================================================
  // SAVE EVENTS
  // =====================================================

  useEffect(() => {

    if (!storageLoaded) return;


    localStorage.setItem(
      "wishcircle-events",
      JSON.stringify(events)
    );

  }, [
    events,
    storageLoaded,
  ]);


  // =====================================================
  // SELECTED CIRCLE
  // =====================================================

  const selectedCircle =
    circles.find(
      (circle) =>
        circle.id ===
        selectedCircleId
    ) || null;


  // =====================================================
  // SELECTED EVENT
  // =====================================================

  const selectedEvent =
    events.find(
      (event) =>
        event.id ===
        selectedEventId
    ) || null;


  // =====================================================
  // AUTH FUNCTIONS
  // =====================================================

  function loginUser({
    email,
  }) {

    setCurrentUser(
      (current) => ({
        ...current,
        email,
      })
    );


    setIsLoggedIn(true);

    setScreen("home");

  }


  function signupUser(
    userData
  ) {

    const newUser = {

      id: "current-user",

      name:
        userData.name,

      username:
        userData.username,

      email:
        userData.email,

      birthday:
        userData.birthday,

    };


    setCurrentUser(
      newUser
    );


    // New prototype account starts empty

    setWishes([]);

    setCircles([]);

    setReservations([]);

    setEvents([]);


    setIsLoggedIn(true);

    setScreen("home");

  }


  function logoutUser() {

    setIsLoggedIn(false);

    setScreen("login");

  }


  // =====================================================
  // UPDATE PROFILE
  // =====================================================

  function updateProfile(
    updatedUser
  ) {

    setCurrentUser(
      updatedUser
    );

  }


  // =====================================================
  // WISH FUNCTIONS
  // =====================================================

  function addWish(
    newWish
  ) {

    setWishes(
      (current) => [
        newWish,
        ...current,
      ]
    );

  }


  function deleteWish(id) {

    setWishes(
      (current) =>
        current.filter(
          (wish) =>
            wish.id !== id
        )
    );

  }


  // =====================================================
  // CIRCLE FUNCTIONS
  // =====================================================

  function setSelectedCircle(
    circle
  ) {

    setSelectedCircleId(
      circle.id
    );

  }


  function addCircle(
    newCircle
  ) {

    setCircles(
      (current) => [
        ...current,
        newCircle,
      ]
    );

  }


  function addFriendToCircle(
    user
  ) {

    if (!selectedCircleId) {
      return;
    }


    setCircles(
      (current) =>
        current.map(
          (circle) => {

            if (
              circle.id !==
              selectedCircleId
            ) {
              return circle;
            }


            const alreadyAdded =
              circle.members.some(
                (member) =>
                  member.id ===
                  user.id
              );


            if (alreadyAdded) {
              return circle;
            }


            return {

              ...circle,

              members: [
                ...circle.members,
                user,
              ],

            };

          }
        )
    );

  }


  // =====================================================
  // SECRET GIFT RESERVATIONS
  // =====================================================

  function reserveGift(
    friend,
    wish
  ) {

    const alreadyReserved =
      reservations.some(
        (reservation) =>
          reservation.ownerId ===
            friend.id &&
          reservation.wishId ===
            wish.id
      );


    if (alreadyReserved) {
      return;
    }


    const newReservation = {

      id: Date.now(),

      ownerId:
        friend.id,

      ownerName:
        friend.name,

      wishId:
        wish.id,

      wishName:
        wish.name,

      reservedById:
        currentUser.id,

      reservedByName:
        currentUser.name,

    };


    setReservations(
      (current) => [
        ...current,
        newReservation,
      ]
    );

  }


  function cancelReservation(
    ownerId,
    wishId
  ) {

    setReservations(
      (current) =>
        current.filter(
          (reservation) =>
            !(
              reservation.ownerId ===
                ownerId &&
              reservation.wishId ===
                wishId
            )
        )
    );

  }


  // =====================================================
  // EVENT FUNCTIONS
  // =====================================================

  function setSelectedEvent(
    event
  ) {

    setSelectedEventId(
      event.id
    );

  }


  function addEvent(
    newEvent
  ) {

    setEvents(
      (current) => [
        ...current,
        newEvent,
      ]
    );

  }


  // =====================================================
  // SECRET SANTA DRAW
  // =====================================================

  function drawNames(
    eventId
  ) {

    setEvents(
      (currentEvents) =>
        currentEvents.map(
          (event) => {

            if (
              event.id !==
              eventId
            ) {
              return event;
            }


            if (
              event.drawComplete
            ) {
              return event;
            }


            const participants =
              event.participants;


            if (
              participants.length < 2
            ) {
              return event;
            }


            let receivers = [
              ...participants,
            ];


            let validDraw =
              false;


            let attempts = 0;


            while (
              !validDraw &&
              attempts < 100
            ) {

              receivers =
                shuffleArray([
                  ...participants,
                ]);


              validDraw =
                participants.every(
                  (
                    giver,
                    index
                  ) =>
                    giver.id !==
                    receivers[index]
                      .id
                );


              attempts++;

            }


            // Guaranteed fallback

            if (!validDraw) {

              receivers = [

                ...participants.slice(
                  1
                ),

                participants[0],

              ];

            }


            const assignments =
              participants.map(
                (
                  giver,
                  index
                ) => ({

                  giverId:
                    giver.id,

                  giverName:
                    giver.name,

                  receiverId:
                    receivers[index]
                      .id,

                  receiverName:
                    receivers[index]
                      .name,

                })
              );


            return {

              ...event,

              assignments,

              drawComplete:
                true,

            };

          }
        )
    );

  }


  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (!storageLoaded) {

    return (

      <main className="min-h-screen bg-[#FFF8F5] flex items-center justify-center">

        <div className="text-center">

          <div className="text-5xl">
            🎁
          </div>

          <p className="text-[#7B1F2B] font-semibold mt-4">
            Loading WishCircle...
          </p>

        </div>

      </main>

    );

  }


  // =====================================================
  // SPLASH
  // =====================================================

  if (
    screen === "splash"
  ) {

    return (

      <SplashScreen
        setScreen={
          setScreen
        }
      />

    );

  }


  // =====================================================
  // LOGIN
  // =====================================================

  if (
    screen === "login"
  ) {

    return (

      <LoginScreen
        setScreen={
          setScreen
        }
        loginUser={
          loginUser
        }
      />

    );

  }


  // =====================================================
  // SIGN UP
  // =====================================================

  if (
    screen === "signup"
  ) {

    return (

      <SignupScreen
        setScreen={
          setScreen
        }
        signupUser={
          signupUser
        }
      />

    );

  }


  // =====================================================
  // HOME
  // =====================================================

  if (
    screen === "home"
  ) {

    return (

      <AppShell
        screen={screen}
        setScreen={
          setScreen
        }
      >

        <div>


          {/* HEADER */}

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-[#786A68]">
                Welcome back,
              </p>

              <h1 className="text-2xl font-semibold text-[#301C1E]">
                {currentUser.name}! 👋
              </h1>

            </div>


            <div className="flex gap-3">

              <button className="w-10 h-10 bg-[#F5DFD9] rounded-full">
                🔔
              </button>


              <button
                onClick={() =>
                  setScreen(
                    "profile"
                  )
                }
                className="w-10 h-10 bg-[#7B1F2B] text-white rounded-full font-semibold"
              >

                {currentUser.name
                  .charAt(0)
                  .toUpperCase()}

              </button>

            </div>

          </div>


          {/* SEARCH */}

          <div className="mt-6">

            <input
              type="text"
              placeholder="Search friends, wishlists or circles..."
              className="w-full px-4 py-3 rounded-2xl border border-[#EADDD8] bg-white text-sm outline-none"
            />

          </div>


          {/* WISHLIST */}

          <div className="mt-6 bg-[#7B1F2B] rounded-3xl p-5 text-white">

            <p className="text-sm opacity-80">
              Your wishlist
            </p>


            <div className="flex justify-between items-end mt-2">

              <div>

                <h2 className="text-2xl font-semibold">

                  {wishes.length}{" "}

                  {wishes.length === 1
                    ? "wish"
                    : "wishes"}

                </h2>


                <p className="text-xs opacity-80 mt-1">
                  Make gifting easier for your friends.
                </p>

              </div>


              <button
                onClick={() =>
                  setScreen(
                    "wishes"
                  )
                }
                className="bg-white text-[#7B1F2B] px-4 py-2 rounded-xl text-xs font-semibold"
              >
                View
              </button>

            </div>

          </div>


          {/* QUICK ACTIONS */}

          <div className="grid grid-cols-2 gap-3 mt-5">

            <button
              onClick={() =>
                setScreen(
                  "createCircle"
                )
              }
              className="bg-[#F9ECE8] rounded-2xl p-4 text-left"
            >

              <div className="text-2xl">
                👥
              </div>

              <p className="font-semibold text-sm text-[#301C1E] mt-2">
                New Circle
              </p>

            </button>


            <button
              onClick={() =>
                setScreen(
                  "createEvent"
                )
              }
              className="bg-[#F9ECE8] rounded-2xl p-4 text-left"
            >

              <div className="text-2xl">
                🎁
              </div>

              <p className="font-semibold text-sm text-[#301C1E] mt-2">
                Gift Exchange
              </p>

            </button>

          </div>


          {/* EVENTS */}

          {events.length > 0 && (

            <section className="mt-8">

              <div className="flex justify-between items-center">

                <h2 className="font-semibold text-[#301C1E]">
                  🎁 Gift Events
                </h2>


                <button
                  onClick={() =>
                    setScreen(
                      "events"
                    )
                  }
                  className="text-xs text-[#7B1F2B]"
                >
                  See all
                </button>

              </div>


              <div className="space-y-3 mt-4">

                {events
                  .slice(0, 2)
                  .map(
                    (event) => (

                      <button
                        key={
                          event.id
                        }
                        onClick={() => {

                          setSelectedEvent(
                            event
                          );

                          setScreen(
                            "eventDetails"
                          );

                        }}
                        className="w-full text-left border border-[#EADDD8] rounded-2xl p-4 bg-white"
                      >

                        <div className="flex items-center">

                          <div className="w-11 h-11 bg-[#F9ECE8] rounded-xl flex items-center justify-center text-xl">
                            🎁
                          </div>


                          <div className="ml-3 flex-1">

                            <p className="font-semibold text-sm text-[#301C1E]">
                              {event.name}
                            </p>


                            <p className="text-[10px] text-[#786A68] mt-1">

                              {
                                event
                                  .participants
                                  .length
                              }{" "}
                              participants

                            </p>

                          </div>


                          <span className="text-[#7B1F2B]">
                            →
                          </span>

                        </div>

                      </button>

                    )
                  )}

              </div>

            </section>

          )}


          {/* CIRCLES */}

          <section className="mt-8">

            <div className="flex justify-between items-center">

              <h2 className="font-semibold text-[#301C1E]">
                👥 Your Circles
              </h2>


              <button
                onClick={() =>
                  setScreen(
                    "circles"
                  )
                }
                className="text-xs text-[#7B1F2B]"
              >
                See all
              </button>

            </div>


            {circles.length === 0 ? (

              <button
                onClick={() =>
                  setScreen(
                    "createCircle"
                  )
                }
                className="w-full mt-4 border border-dashed border-[#D9C7C1] rounded-2xl p-5 text-center"
              >

                <div className="text-3xl">
                  👥
                </div>


                <p className="font-semibold text-[#301C1E] mt-2">
                  Create your first circle
                </p>


                <p className="text-xs text-[#786A68] mt-1">
                  Besties, family, college — your choice.
                </p>

              </button>

            ) : (

              <div className="grid grid-cols-2 gap-3 mt-4">

                {circles
                  .slice(0, 4)
                  .map(
                    (circle) => (

                      <button
                        key={
                          circle.id
                        }
                        onClick={() => {

                          setSelectedCircle(
                            circle
                          );

                          setScreen(
                            "circleDetails"
                          );

                        }}
                        className="bg-[#F9ECE8] rounded-2xl p-4 text-left"
                      >

                        <div className="text-2xl">
                          {circle.emoji}
                        </div>


                        <p className="font-semibold text-[#301C1E] mt-2">
                          {circle.name}
                        </p>


                        <p className="text-xs text-[#786A68] mt-1">

                          {
                            circle
                              .members
                              .length
                          }{" "}
                          members

                        </p>

                      </button>

                    )
                  )}

              </div>

            )}

          </section>


          {/* SECRET GIFT PLANS */}

          {reservations.length > 0 && (

            <section className="mt-8">

              <h2 className="font-semibold text-[#301C1E]">
                🤫 Your Secret Gift Plans
              </h2>


              <div className="space-y-3 mt-4">

                {reservations.map(
                  (
                    reservation
                  ) => (

                    <div
                      key={
                        reservation.id
                      }
                      className="bg-[#F9ECE8] rounded-2xl p-4"
                    >

                      <p className="font-semibold text-[#301C1E]">

                        🎁{" "}

                        {
                          reservation
                            .wishName
                        }

                      </p>


                      <p className="text-xs text-[#786A68] mt-1">

                        For{" "}

                        {
                          reservation
                            .ownerName
                        }

                      </p>


                      <p className="text-[10px] text-[#7B1F2B] mt-2 font-semibold">
                        Keep it secret 🤫
                      </p>

                    </div>

                  )
                )}

              </div>

            </section>

          )}


          {/* UPCOMING BIRTHDAYS */}

          <section className="mt-8">

            <div className="flex justify-between items-center">

              <h2 className="font-semibold text-[#301C1E]">
                🎂 Upcoming Birthdays
              </h2>

              <span className="text-xs text-[#786A68]">
                Demo
              </span>

            </div>


            <div className="flex gap-3 mt-4">

              <BirthdayCard
                initial="R"
                name="Riya"
                days="3 days"
              />


              <BirthdayCard
                initial="A"
                name="Ananya"
                days="12 days"
              />


              <BirthdayCard
                initial="S"
                name="Sneha"
                days="18 days"
              />

            </div>

          </section>

        </div>

      </AppShell>

    );

  }


  // =====================================================
  // WISHES
  // =====================================================

  if (
    screen === "wishes"
  ) {

    return (

      <WishesScreen
        screen={screen}
        setScreen={
          setScreen
        }
        wishes={
          wishes
        }
        deleteWish={
          deleteWish
        }
      />

    );

  }


  if (
    screen === "addWish"
  ) {

    return (

      <AddWishScreen
        screen={screen}
        setScreen={
          setScreen
        }
        addWish={
          addWish
        }
      />

    );

  }


  // =====================================================
  // CIRCLES
  // =====================================================

  if (
    screen === "circles"
  ) {

    return (

      <CirclesScreen
        screen={screen}
        setScreen={
          setScreen
        }
        circles={
          circles
        }
        setSelectedCircle={
          setSelectedCircle
        }
      />

    );

  }


  if (
    screen ===
    "createCircle"
  ) {

    return (

      <CreateCircleScreen
        screen={screen}
        setScreen={
          setScreen
        }
        addCircle={
          addCircle
        }
      />

    );

  }


  if (
    screen ===
    "circleDetails"
  ) {

    return (

      <CircleDetailsScreen
        screen={screen}
        setScreen={
          setScreen
        }
        selectedCircle={
          selectedCircle
        }
        setSelectedFriend={
          setSelectedFriend
        }
      />

    );

  }


  if (
    screen ===
    "addFriend"
  ) {

    return (

      <AddFriendScreen
        screen={screen}
        setScreen={
          setScreen
        }
        registeredUsers={
          registeredUsers
        }
        selectedCircle={
          selectedCircle
        }
        addFriendToCircle={
          addFriendToCircle
        }
      />

    );

  }


  if (
    screen ===
    "friendProfile"
  ) {

    return (

      <FriendProfileScreen
        screen={screen}
        setScreen={
          setScreen
        }
        selectedFriend={
          selectedFriend
        }
        reservations={
          reservations
        }
        reserveGift={
          reserveGift
        }
        cancelReservation={
          cancelReservation
        }
      />

    );

  }


  // =====================================================
  // EVENTS
  // =====================================================

  if (
    screen === "events"
  ) {

    return (

      <EventsScreen
        screen={screen}
        setScreen={
          setScreen
        }
        events={
          events
        }
        setSelectedEvent={
          setSelectedEvent
        }
      />

    );

  }


  if (
    screen ===
    "createEvent"
  ) {

    return (

      <CreateEventScreen
        screen={screen}
        setScreen={
          setScreen
        }
        circles={
          circles
        }
        addEvent={
          addEvent
        }
      />

    );

  }


  if (
    screen ===
    "eventDetails"
  ) {

    return (

      <EventDetailsScreen
        screen={screen}
        setScreen={
          setScreen
        }
        selectedEvent={
          selectedEvent
        }
        drawNames={
          drawNames
        }
      />

    );

  }


  if (
    screen ===
    "eventRecipient"
  ) {

    return (

      <EventRecipientScreen
        screen={screen}
        setScreen={
          setScreen
        }
        selectedEvent={
          selectedEvent
        }
        reservations={
          reservations
        }
        reserveGift={
          reserveGift
        }
        cancelReservation={
          cancelReservation
        }
      />

    );

  }


  // =====================================================
  // PROFILE
  // =====================================================

  if (
    screen === "profile"
  ) {

    return (

      <ProfileScreen
        screen={screen}
        setScreen={
          setScreen
        }
        currentUser={
          currentUser
        }
        wishes={
          wishes
        }
        circles={
          circles
        }
        events={
          events
        }
        logoutUser={
          logoutUser
        }
      />

    );

  }


  // =====================================================
  // EDIT PROFILE
  // =====================================================

  if (
    screen ===
    "editProfile"
  ) {

    return (

      <EditProfileScreen
        screen={screen}
        setScreen={
          setScreen
        }
        currentUser={
          currentUser
        }
        updateProfile={
          updateProfile
        }
      />

    );

  }


  return null;

}


// =====================================================
// SHUFFLE ARRAY
// =====================================================

function shuffleArray(
  array
) {

  const shuffled = [
    ...array,
  ];


  for (
    let i =
      shuffled.length - 1;

    i > 0;

    i--
  ) {

    const j =
      Math.floor(
        Math.random() *
          (i + 1)
      );


    [
      shuffled[i],
      shuffled[j],
    ] = [
      shuffled[j],
      shuffled[i],
    ];

  }


  return shuffled;

}


// =====================================================
// BIRTHDAY CARD
// =====================================================

function BirthdayCard({
  initial,
  name,
  days,
}) {

  return (

    <div className="flex-1 text-center bg-[#FFF8F5] rounded-2xl py-4">

      <div className="w-11 h-11 mx-auto bg-[#F5DFD9] rounded-full flex items-center justify-center text-[#7B1F2B] font-semibold">
        {initial}
      </div>


      <p className="text-sm font-semibold text-[#301C1E] mt-2">
        {name}
      </p>


      <p className="text-[10px] text-[#786A68]">
        In {days}
      </p>

    </div>

  );

}