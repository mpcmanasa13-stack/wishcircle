"use client";

import { useState } from "react";


// =====================================================
// SPLASH SCREEN
// =====================================================

export function SplashScreen({
  setScreen,
}) {
  return (
    <main className="min-h-screen bg-[#FFF8F5] flex items-center justify-center p-6">

      <div className="w-full max-w-[390px] min-h-[760px] bg-[#FFFDFC] rounded-[32px] shadow-xl px-7 py-10 flex flex-col">

        <div className="flex-1 flex flex-col items-center justify-center text-center">

          <div className="w-24 h-24 bg-[#F5DFD9] rounded-[30px] flex items-center justify-center text-5xl shadow-sm">
            🎁
          </div>

          <h1 className="text-5xl font-semibold text-[#7B1F2B] mt-8">
            WishCircle
          </h1>

          <p className="text-[#786A68] text-lg mt-4">
            Wish it. Share it.
          </p>

          <p className="text-[#786A68] text-lg">
            Keep the surprise.
          </p>

          <div className="flex items-center gap-2 mt-8">

            <span className="w-2 h-2 bg-[#7B1F2B] rounded-full" />

            <span className="w-2 h-2 bg-[#D9C7C1] rounded-full" />

            <span className="w-2 h-2 bg-[#D9C7C1] rounded-full" />

          </div>

        </div>


        <div className="space-y-4">

          <button
            onClick={() =>
              setScreen("login")
            }
            className="w-full bg-[#7B1F2B] text-white py-4 rounded-2xl text-lg font-semibold"
          >
            Get Started →
          </button>

          <p className="text-center text-xs text-[#786A68]">
            Thoughtful gifting, without spoiled surprises.
          </p>

        </div>

      </div>

    </main>
  );
}


// =====================================================
// LOGIN SCREEN
// =====================================================

export function LoginScreen({
  setScreen,
  loginUser,
}) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");


  function handleLogin(event) {
    event.preventDefault();

    if (!email.trim()) {
      setError(
        "Please enter your email."
      );

      return;
    }


    if (!email.includes("@")) {
      setError(
        "Please enter a valid email address."
      );

      return;
    }


    if (!password.trim()) {
      setError(
        "Please enter your password."
      );

      return;
    }


    if (password.length < 4) {
      setError(
        "Password must contain at least 4 characters."
      );

      return;
    }


    loginUser({
      email: email.trim(),
    });
  }


  return (
    <main className="min-h-screen bg-[#FFF8F5] flex items-center justify-center p-6">

      <div className="w-full max-w-[390px] min-h-[760px] bg-[#FFFDFC] rounded-[32px] shadow-xl px-7 py-8 flex flex-col">

        <button
          onClick={() =>
            setScreen("splash")
          }
          className="w-10 h-10 rounded-full border border-[#EADDD8] flex items-center justify-center text-[#301C1E]"
        >
          ←
        </button>


        <div className="mt-8">

          <div className="text-center">

            <div className="w-16 h-16 mx-auto bg-[#F5DFD9] rounded-2xl flex items-center justify-center text-3xl">
              🎁
            </div>

            <h1 className="text-3xl font-semibold text-[#7B1F2B] mt-4">
              Welcome back
            </h1>

            <p className="text-sm text-[#786A68] mt-2">
              Your wishes are waiting ✨
            </p>

          </div>


          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >

            <div>

              <label className="text-sm font-medium text-[#301C1E]">
                Email
              </label>

              <input
                value={email}
                onChange={(event) => {
                  setEmail(
                    event.target.value
                  );

                  setError("");
                }}
                type="email"
                placeholder="you@example.com"
                className="w-full mt-2 px-4 py-4 bg-white border border-[#EADDD8] rounded-2xl outline-none focus:border-[#7B1F2B]"
              />

            </div>


            <div>

              <div className="flex justify-between">

                <label className="text-sm font-medium text-[#301C1E]">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-[#7B1F2B]"
                >
                  Forgot?
                </button>

              </div>


              <input
                value={password}
                onChange={(event) => {
                  setPassword(
                    event.target.value
                  );

                  setError("");
                }}
                type="password"
                placeholder="Enter your password"
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
              Login
            </button>

          </form>


          <div className="flex items-center gap-3 my-6">

            <div className="h-px bg-[#EADDD8] flex-1" />

            <span className="text-xs text-[#9A8B88]">
              OR
            </span>

            <div className="h-px bg-[#EADDD8] flex-1" />

          </div>


          <button
            type="button"
            className="w-full border border-[#EADDD8] bg-white py-4 rounded-2xl text-[#301C1E] font-medium"
          >
            G&nbsp;&nbsp; Continue with Google
          </button>


          <p className="text-center text-sm text-[#786A68] mt-7">

            New to WishCircle?{" "}

            <button
              onClick={() =>
                setScreen("signup")
              }
              className="text-[#7B1F2B] font-semibold"
            >
              Create account
            </button>

          </p>

        </div>

      </div>

    </main>
  );
}


// =====================================================
// SIGN UP
// =====================================================

export function SignupScreen({
  setScreen,
  signupUser,
}) {
  const [name, setName] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [birthday, setBirthday] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");


  function handleSignup(event) {
    event.preventDefault();


    if (!name.trim()) {
      setError(
        "Please enter your name."
      );

      return;
    }


    if (!username.trim()) {
      setError(
        "Please choose a username."
      );

      return;
    }


    if (username.includes(" ")) {
      setError(
        "Username cannot contain spaces."
      );

      return;
    }


    if (
      !email.trim() ||
      !email.includes("@")
    ) {
      setError(
        "Please enter a valid email."
      );

      return;
    }


    if (!birthday) {
      setError(
        "Please enter your birthday."
      );

      return;
    }


    if (password.length < 4) {
      setError(
        "Password must contain at least 4 characters."
      );

      return;
    }


    signupUser({
      name: name.trim(),

      username:
        username
          .trim()
          .toLowerCase(),

      email:
        email.trim(),

      birthday,

      password,
    });
  }


  return (
    <main className="min-h-screen bg-[#FFF8F5] flex items-center justify-center p-6">

      <div className="w-full max-w-[390px] h-[760px] bg-[#FFFDFC] rounded-[32px] shadow-xl overflow-hidden">

        <div className="h-full overflow-y-auto px-7 py-8">

          <button
            onClick={() =>
              setScreen("login")
            }
            className="w-10 h-10 rounded-full border border-[#EADDD8] flex items-center justify-center"
          >
            ←
          </button>


          <div className="mt-6">

            <h1 className="text-3xl font-semibold text-[#301C1E]">
              Join WishCircle 💗
            </h1>

            <p className="text-sm text-[#786A68] mt-2">
              Create your profile and start sharing wishes.
            </p>


            <form
              onSubmit={handleSignup}
              className="mt-7 space-y-5"
            >

              <Field
                label="Your name *"
                value={name}
                setValue={setName}
                placeholder="Manasa"
                clearError={() =>
                  setError("")
                }
              />


              <Field
                label="Username *"
                value={username}
                setValue={setUsername}
                placeholder="manasa13"
                clearError={() =>
                  setError("")
                }
              />


              <Field
                label="Email *"
                value={email}
                setValue={setEmail}
                placeholder="you@example.com"
                type="email"
                clearError={() =>
                  setError("")
                }
              />


              <div>

                <label className="text-sm font-medium text-[#301C1E]">
                  Birthday *
                </label>

                <input
                  value={birthday}
                  onChange={(event) => {
                    setBirthday(
                      event.target.value
                    );

                    setError("");
                  }}
                  type="date"
                  className="w-full mt-2 px-4 py-4 bg-white border border-[#EADDD8] rounded-2xl outline-none focus:border-[#7B1F2B]"
                />

                <p className="text-[10px] text-[#9A8B88] mt-2">
                  Used for birthday reminders for your friends.
                </p>

              </div>


              <Field
                label="Password *"
                value={password}
                setValue={setPassword}
                placeholder="Create a password"
                type="password"
                clearError={() =>
                  setError("")
                }
              />


              {error && (

                <div className="bg-[#FFF0EE] text-[#9B2636] text-sm rounded-2xl px-4 py-3">
                  {error}
                </div>

              )}


              <div className="bg-[#F9ECE8] rounded-2xl p-4">

                <p className="text-xs text-[#786A68] leading-5">
                  🔐 Your wishlist belongs to you. Secret gift
                  reservations remain hidden from the wishlist owner.
                </p>

              </div>


              <button
                type="submit"
                className="w-full bg-[#7B1F2B] text-white py-4 rounded-2xl font-semibold"
              >
                Create My Account
              </button>


              <p className="text-center text-xs text-[#786A68] pb-5">

                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() =>
                    setScreen("login")
                  }
                  className="text-[#7B1F2B] font-semibold"
                >
                  Login
                </button>

              </p>

            </form>

          </div>

        </div>

      </div>

    </main>
  );
}


// =====================================================
// INPUT FIELD
// =====================================================

function Field({
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
          setValue(
            event.target.value
          );

          clearError();
        }}
        type={type}
        placeholder={placeholder}
        className="w-full mt-2 px-4 py-4 bg-white border border-[#EADDD8] rounded-2xl outline-none focus:border-[#7B1F2B]"
      />

    </div>
  );
}