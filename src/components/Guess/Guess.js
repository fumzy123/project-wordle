import React, { useEffect } from 'react';

import { range } from '../../utils';
import { checkGuess } from '../../game-helpers.js';

function Guess({ value, answer, updateGameStatus }) {
  // Check the Guess
  const result = checkGuess(value, answer);
  console.log(result);

  // Grab the Result of the Guess
  useEffect(() => {
    updateGameStatus(result);
  }, [updateGameStatus, result]);

  return (
    <>
      <p className="guess">
        {range(5).map((num, index) => {
          return (
            <span
              key={num}
              className={`cell ${result ? result[index].status : ''}`}
            >
              {value[index]}
            </span>
          );
        })}
      </p>
    </>

    // <div className="guess-results">
    //   {range(NUM_OF_GUESSES_ALLOWED).map((rowNum) => {
    //     // Create Five Boxes
    //     const fiveBoxes = range(5).map((colNum) => {
    //       return <span key={colNum} className="cell"></span>;
    //     });

    //     // Wrap the Boxes into a Row
    //     return (
    //       <p key={rowNum} className="guess">
    //         {fiveBoxes}
    //       </p>
    //     );
    //   })}
    // </div>
  );
}

export default Guess;
