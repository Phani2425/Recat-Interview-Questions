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
