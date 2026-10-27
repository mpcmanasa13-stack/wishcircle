"use client";

export default function AppShell({
  children,
  screen,
  setScreen,
  showBack = false,
  backTo = "home",
  title = "",
}) {
  return (
    <main className="min-h-screen bg-[#FFF8F5] flex items-center justify-center p-6">
      <div className="relative w-full max-w-[390px] h-[760px] bg-[#FFFDFC] rounded-[32px] shadow-xl overflow-hidden">

        {/* PAGE CONTENT */}
        <div className="h-full overflow-y-auto px-6 pt-7 pb-28">

          {/* BACK NAVIGATION */}
          {showBack && (
            <div className="flex items-center mb-6">
              <button
                onClick={() => setScreen(backTo)}
                className="w-10 h-10 rounded-full bg-[#FFF8F5] border border-[#EADDD8] flex items-center justify-center text-xl text-[#301C1E] hover:bg-[#F5DFD9] transition"
                aria-label="Go back"
              >
                ←
              </button>

              {title && (
                <p className="ml-3 font-semibold text-[#301C1E]">
                  {title}
                </p>
              )}
            </div>
          )}

          {children}
        </div>

        {/* BOTTOM NAVIGATION */}
        <BottomNavigation
          screen={screen}
          setScreen={setScreen}
        />

      </div>
    </main>
  );
}


function BottomNavigation({ screen, setScreen }) {
  const items = [
    ["home", "⌂", "Home"],
    ["wishes", "♡", "Wishes"],
    ["events", "🎁", "Events"],
    ["circles", "👥", "Circles"],
    ["profile", "♙", "Profile"],
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#EADDD8] px-2 py-3 flex justify-around">

      {items.map(([key, icon, label]) => {
        const active = screen === key;

        return (
          <button
            key={key}
            onClick={() => setScreen(key)}
            className={`flex flex-col items-center min-w-[55px] text-[11px] transition ${
              active
                ? "text-[#7B1F2B] font-semibold"
                : "text-[#786A68]"
            }`}
          >
            <span className="text-xl">
              {icon}
            </span>

            <span className="mt-1">
              {label}
            </span>

            {active && (
              <span className="w-1 h-1 bg-[#7B1F2B] rounded-full mt-1" />
            )}
          </button>
        );
      })}

    </div>
  );
}