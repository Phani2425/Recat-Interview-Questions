import { useEffect, useState } from "react";

const LightDarkMode = () => {
  const [theme, settheme] = useState(localStorage.getItem("theme") || "light");

  const clickHandler = () => {
    settheme(theme === "light" ? "dark" : "light");
  };

  useEffect(()=> {
    localStorage.setItem("theme", theme);
  },[theme])

  return (
    <div
      className={`w-screen h-screen ${
        theme === "light" ? "bg-white" : "bg-black"
      } flex justify-center items-center transition-all duration-200 `}
    >
      <div className="w-8/12 flex flex-col justify-center items-start mx-auto gap-6">
        <h1
          className={`font-bold text-5xl  ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          Hello World !!!
        </h1>
        <button
          onClick={clickHandler}
          className={` transition-all duration-200 hover:scale-105 cursor-pointer font-semibold px-3 py-2 rounded-lg ${
            theme === "light"
              ? "border border-black"
              : "border border-white bg-black text-white"
          }`}
        >
          Change Theme
        </button>
      </div>
    </div>
  );
};

export default LightDarkMode;
