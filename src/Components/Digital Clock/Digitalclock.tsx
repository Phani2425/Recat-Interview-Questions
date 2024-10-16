import React, { useEffect, useState } from "react";

type Props = {};

const Digitalclock = (props: Props) => {
  const [dateObject, setdateObject] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setdateObject(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <div className="flex flex-col gap-5 justify-center items-center my-20">
      <span className="text-5xl font-bold">DIGITAL CLOCK</span>
      <div className="text-blue-600 font-bold text-4xl">
        <span>{dateObject.getHours().toString().padStart(2, "0")}</span>:
        <span>{dateObject.getMinutes().toString().padStart(2, "0")}</span>:
        <span>{dateObject.getSeconds().toString().padStart(2, "0")}</span>
      </div>

      <div>
        {dateObject.toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
};

export default Digitalclock;


// In DigitalClock code, when the state (dateObject) changes and the component re-renders, the setInterval function is not being added or recreated again. Here's why:

// State Change (Re-render):

// When setdateObject(new Date()) is called, it updates the state.
// This triggers a re-render of the component, but it doesn't re-run the useEffect hook because the dependency array ([]) is empty. React only re-renders the component to reflect the updated state (i.e., the new time).
// useEffect with an Empty Dependency Array:

// The useEffect hook, which contains the setInterval, only runs once when the component mounts (i.e., on the initial render).
// The setInterval is created only once when the component mounts and it continues running every second to update the time.
// On subsequent re-renders, the useEffect does not run again because of the empty dependency array, so no new intervals are added.
// Interval Cleanup:

// When the component unmounts (e.g., if it's removed from the DOM), the cleanup function (return () => clearInterval(intervalId);) ensures that the interval is cleared and no further updates are made.
// Summary:
// State changes cause a re-render, but the useEffect hook (and thus the setInterval) is not re-executed on every re-render because the dependency array is empty.
// The setInterval function is only added once when the component mounts.