import { useState } from "react";

export default function Sidebar() {
  const [theme, setTheme] = useState("light"); // Add state for theme

  const containerStyle = {
    backgroundColor: theme === "light" ? "#f8f9fa" : "#343a40", // Apply light or dark background color
    color: theme === "light" ? "#000000" : "#ffffff", // Apply light or dark text color
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light"); // Toggle theme
  };
  return (
    <>
      <div style={containerStyle}>
        <span
          className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
          onclick="openSidebar()"
        >
          <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md" />
        </span>
        <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center">
              {/* <i class="bi bi-joystick"></i> */}
              <h1 className="font-bold text-gray-200 text-[15px] ml-3">
                Chess Game Board
              </h1>
              <i
                className="bi bi-x cursor-pointer ml-28 lg:hidden"
                onclick="openSidebar()"
              />
            </div>
            <div className="my-2 bg-gray-600 h-[1px]" />
          </div>

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i class="bi bi-joystick"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              New Game
            </span>
          </div>
          <div className="my-4 bg-gray-600 h-[1px]" />
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onclick="dropdown()"
          >
            <i class="bi bi-people-fill"></i>
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-gray-200 font-bold">
                Players
              </span>
              <span className="text-sm rotate-180" id="arrow">
                {/* <i className="bi bi-chevron-down" /> */}
              </span>
            </div>
          </div>
          <div
            className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
            id="submenu"
          >
            <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              <i class="bi bi-person-fill"></i> Aamir
            </h1>
            <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              <i class="bi bi-person-fill"></i> Tariq
            </h1>
            <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              <i class="bi bi-person-fill"></i> Ahmed
            </h1>
          </div>
          <div style={containerStyle}>
            <button
              onClick={toggleTheme}
              type="button"
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Toggle Theme
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
