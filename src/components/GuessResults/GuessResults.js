import React from 'react';

function GuessResults({ guessList }) {
  return (
    <div className="guess-results">
      {guessList.map(({ id, word }) => (
        <p className="guess" key={id}>
          {word}
        </p>
      ))}
    </div>
  );
}

export default GuessResults;
