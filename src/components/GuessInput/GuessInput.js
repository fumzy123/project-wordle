import React, { useState } from 'react';

function GuessInput() {
  // UseState
  // Define a state to hold the value of the guess
  const [guess, setGuess] = useState({ guess: '' });

  // Event Handlers
  // Once enter is pressed on the input form
  // the `onSubmit` Event Hanlder will be triggerred
  // and this Event Hanlder function will execute.
  function handleFormSubmit(event) {
    // Prevent the Web Page from refreshing
    event.preventDefault();
    // Print the Word that the user guessed
    console.log(guess);

    // Reset to an empty string
    setGuess({ guess: '' });
  }

  return (
    <div>
      <form
        className="guess-input-wrapper"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="guess-input">Enter Guess: </label>
        <input
          id="guess-input"
          type="text"
          minLength={5}
          maxLength={5}
          pattern="^[a-zA-Z]{5}$"
          title="5 letter word"
          // For Complex states: States that are not strings.
          // You will need to:
          //    - Copy the existing state using the spread operator
          //    - Update the specific parts of the newly created state
          //    - Pass the newly created state into the set state function
          onChange={(event) => {
            const nextGuess = { ...guess };
            nextGuess.guess = event.target.value.toUpperCase();
            setGuess(nextGuess);
          }}
          value={guess.guess}
        ></input>
      </form>
    </div>
  );
}

export default GuessInput;
