import React from 'react';

import Guess from '../Guess/Guess';

import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { range } from '../../utils';

function GuessResults({ guessList, answer, updateGameStatus }) {
  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((num) => (
        <Guess
          key={num}
          value={guessList[num] ? guessList[num].word : ''}
          answer={answer}
          updateGameStatus={updateGameStatus}
        ></Guess>
      ))}
    </div>
  );
}

export default GuessResults;
