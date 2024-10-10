import { useEffect, useState } from "react";

const TicTacToe = () => {
  const winningPatterns: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [gameState, setgameState] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [currentPlayer, setcurrentPlayer] = useState<boolean>(true);
  const [winner, setwinner] = useState<string>("");
  const [matchDraw, setmatchDraw] = useState<boolean>(false);

  const isMatchEnded = () => {
    for (const pattern of winningPatterns) {
      let flag = true;
      pattern.forEach((index) => {
        if (gameState[index] !== (currentPlayer ? "X" : "0")) {
          flag = false;
        }
      });

      if (flag) {
        setwinner(currentPlayer ? "X" : "0");
        break;
      }
    }

    if (winner !== "") {
      return;
    }

    //checking if game is draw
    let count = 0;
    gameState.forEach((box) => {
      if (box !== "") {
        count++;
      }
    });
    if (count === 9) {
      setmatchDraw(true);
      return;
    }
  };

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const index = parseInt((e.target as HTMLDivElement).id);

    if (gameState[index] === "") {
      setgameState(
        gameState.map((elem, ind) => {
          if (ind === index) {
            return currentPlayer ? "X" : "0";
          } else {
            return elem;
          }
        })
      );
    } else {
      return;
    }
  };

  useEffect(() => {

    //function for checking if the match ended
    isMatchEnded();

    setcurrentPlayer(!currentPlayer);
  }, [gameState]);

  const restart = () => {
    setwinner("");
    setmatchDraw(false);
    setcurrentPlayer(true);
    setgameState(gameState.map((elem) => ""));
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center">
      {winner === "" && !matchDraw && (
        <div className="grid grid-cols-3 grid-rows-3 h-[400px] w-[400px] border-2 border-black">
          <div
            className="flex justify-center items-center text-6xl p-3 border-r-2 border-b-2 border-black "
            id="0"
            onClick={clickHandler}
          >
            {gameState[0]}
          </div>
          <div
            className="flex justify-center items-center text-6xl p-3 border-r-2 border-b-2 border-black "
            id="1"
            onClick={clickHandler}
          >
            {gameState[1]}
          </div>
          <div
            className="flex justify-center items-center text-6xl p-3 b border-b-2 border-black "
            id="2"
            onClick={clickHandler}
          >
            {gameState[2]}
          </div>
          <div
            className="flex justify-center items-center text-6xl p-3 border-r-2 border-b-2 border-black "
            id="3"
            onClick={clickHandler}
          >
            {gameState[3]}
          </div>
          <div
            className="flex justify-center items-center text-6xl p-3 border-r-2 border-b-2 border-black "
            id="4"
            onClick={clickHandler}
          >
            {gameState[4]}
          </div>
          <div
            className="flex justify-center items-center text-6xl p-3  border-b-2 border-black "
            id="5"
            onClick={clickHandler}
          >
            {gameState[5]}
          </div>
          <div
            className="flex justify-center items-center text-6xl p-3 border-r-2  border-black "
            id="6"
            onClick={clickHandler}
          >
            {gameState[6]}
          </div>
          <div
            className="flex justify-center items-center text-6xl p-3 border-r-2  border-black "
            id="7"
            onClick={clickHandler}
          >
            {gameState[7]}
          </div>
          <div
            className="flex justify-center items-center text-6xl p-3  border-black "
            id="8"
            onClick={clickHandler}
          >
            {gameState[8]}
          </div>
        </div>
      )}

      <span className="text-xl font-bold">{`${
        winner !== ""
          ? `${winner} won the match`
          : `${
              matchDraw
                ? "match draw!! Please restart the game..."
                : `Current Player is ${currentPlayer ? "X" : "0"}`
            }`
      }`}</span>

      <button
        className="px-4 py-2 bg-yellow-500 rounded-lg hover:scale-95 hover:shadow-lg text-white font-semibold"
        onClick={restart}
      >
        Restart
      </button>
    </div>
  );
};

export default TicTacToe;

//IN TYPESCRIPT WHEN I HAVE TO ACCESS E.TARGET.ID OR ANY ATTRIBUTE THROUGH THE EVENT OBJECT THEN WE CAN'T ACCESS THAT DIRECTLY WE HAVE TO DO:- (e.target as HTMLDivElement).id  SIMILLARLY WE HAVE TO ACCESS THEM

//HERE INITIALLY I WAS GETTING WRONG ANSWER BECAUSE WHEN I WAS UPDATING THE GAME STATE IT WAS NOT ACTUALLY GETTING UPDATED QUICKLY AS REACT QUEUES STATE UPDATES SO REACT WAS QUEUEING THAT AND AFTER CHANGING THE STATE I WAS INSTANTLY CALLING THE FUNCTION WHICH USED TO CHECK WHEATHER CURRENT PLAYER OWN OR THE MATCH GOT DRAW AND THAT FUNCTION WAS DEPENDENT UPON THE GAMESTATE.....

//SO WWHAT WAS HAPPENING IS THE GAMESTATE IS NOT UPDATED YET AND THE FUNCTION WAS USING THE NON UPDATED GAMESTATE... SO IT WAS NOT CORRECTLY IDENTIFYING THE WINNER AND IDENTIFYING IT LATER AFTER SOME STEPS PLAYED .....

//INTERESTING THING IS WHEN WE WERE CLICKING ON ANY BOX THE SIGN OF CURRENT PPLAYER WAS VISISBE THERE INSTANTLY MEANS GAMESTATE WAS GETTING UPDATED FOR WHICH THE SIGN WAS VISISBLE BUT BEFORE THAT THE FUNCTION RUNNED COMPLETELY SO PROBLEM WAS ARISINNG

//SO WHAT I DID AS I AM DEPENDING UPON A STATE JUST AFTER UPADATING IT... SO HERE ONLY TRICK IS USING "useEffect()" hook where we add the state in its dependency list and perform all those dependent work in that useEffect hook....

//because when we use useEffect then it only runs when the state in its dependency list get changed not before that so we will gwt right answer here
