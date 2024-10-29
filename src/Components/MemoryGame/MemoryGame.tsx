import { useEffect, useState } from "react";

const getCardValues = (gridSize: number) => {
  let cardValues;

  if (gridSize % 2 === 0) {
    cardValues = Math.pow(gridSize, 2) / 2;
  } else {
    cardValues = (Math.pow(gridSize, 2) - 1) / 2;
  }

  const freqArray = Array(cardValues).fill(0);

  const AnsArray = [];

  for (let i = 1; i <= cardValues * 2; i++) {
    let index = Math.floor(Math.random() * cardValues);
    while (freqArray[index] === 2) {
      index = Math.floor(Math.random() * cardValues);
    }

    AnsArray.push(index + 1);
    freqArray[index]++;
  }

  console.log(AnsArray);

  return AnsArray;
};

const MemoryGame = () => {
  const [gridSize, setgridSize] = useState<number>(4);
  const [cards, setcards] = useState<number[]>(getCardValues(gridSize));

  const [isFlipped, setisFlipped] = useState<number[]>([]);
  const [solved, setisSolved] = useState<number[]>([]);

  const [won, setwon] = useState<boolean>(false);

  useEffect(() => {
    console.log(solved);
    console.log(cards);
    if (solved.length === cards.length) {
      setwon(true);
    }
  }, [solved]);

  useEffect(() => {
    setcards(getCardValues(gridSize));
  }, [gridSize]);

  const selectHandler = (index:number) => {
    if (isFlipped.includes(index)) {
      return;
    }

    setisFlipped((prev) => {
      return [...prev, index];
    });
  };

  useEffect(() => {
    if (isFlipped.length === 2) {
      //check wheather the flipped cards have same value or not
      if (cards[isFlipped[0]] === cards[isFlipped[1]]) {
        setisSolved((prev) => {
          return [...prev, isFlipped[0], isFlipped[1]];
        });
        setisFlipped([]);
      }
      else{
        setTimeout(() => {
           setisFlipped([])
        },1000)
      }
    }
},[isFlipped])


  const resetGame = () => {
    setwon(false);
    setisSolved([]);
    setisFlipped([]);
    setcards(getCardValues(gridSize));
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-5">
      <div className="flex flex-col">
        <label htmlFor="gridsize">slect grid size </label>
        <select
          value={gridSize}
          onChange={(e) => setgridSize(parseInt(e.target.value))}
          className="w-24 bg-slate-600 text-white px-2 py-1"
          id="gridsize"
        >
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select>
      </div>

      <div
        className="gap-2"
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${gridSize},1fr)`,
          gridTemplateColumns: `repeat(${gridSize},1fr)`,
        }}
      >
        {cards.map((number, index) => (
          <button
            disabled={solved.includes(index) ? true : false}
            className={`h-20 w-20 rounded-lg bg-slate-600 text-white ${
              isFlipped.includes(index) && "bg-blue-600"
            } ${solved.includes(index) && "bg-green-600"}`}
            onClick={() => {
              selectHandler(index);
            }}
          >
            {isFlipped.includes(index)||solved.includes(index) ? number : "?"}
          </button>
        ))}
      </div>

      <div>
        {won && (
          <h1 className="text-3xl font-bold text-green-600 animate-bounce">
            YOU WON!!!
          </h1>
        )}
      </div>

      <button className="px-4 py-2 bg-red-600 text-white rounded-md" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default MemoryGame;
