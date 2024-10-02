import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Star = () => {
  const starArray = new Array(10).fill(0);

  const [rating, setrating] = useState<number>(-1);
  const [hoverIndex, sethoverIndex] = useState<number>(-1);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        className="flex gap-2"
        onMouseLeave={() => {
          sethoverIndex(rating);
        }}
      >
        {starArray.map((data, index) => (
          <FaStar
            key={index}
            className={`${
              (index <= rating || index <= hoverIndex) &&
              "  text-yellow-400"
            } cursor-pointer`}
            size={40}
            onClick={() => {
              setrating(index);
            }}
            onMouseEnter={() => {
              sethoverIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Star;
