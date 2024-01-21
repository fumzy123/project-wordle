import React, { useState } from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';

// import Smaller Components
import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  // UseState
  // A State to hold all the previous guess Attempts
  const [guessList, setGuessList] = useState([]);

  // Event Handlers
  // This function hanldes the submission of the users guess to the guess list
  function handleSubmitGuess(guess) {
    // Whenever you call a setState function you are telling React
    // to re-render the component with the new value. This does not happen immediately,
    // React has to finish its current render before re-rendering your component with the new value.
    setGuessList((prevGuessList) => {
      // Copy the current list of previous guesses
      const newGuessList = [...prevGuessList];

      // Add a new word to the guess list
      // Generate a Unique Id for the new data we just received from the user.
      // As soon as the data is created.
      newGuessList.push({ id: crypto.randomUUID(), word: guess });

      // Set this as the new value of the prevGuess
      return newGuessList;
    });
  }

  return (
    <>
      <GuessResults guessList={guessList} />
      <GuessInput handleSubmitGuess={handleSubmitGuess} />
    </>
  );
}

export default Game;

// Context:
//    I understand that GuessInput and Guess Results are two separate components.
// Problem:
//    The GuessResults component needs to access the guess state that
//    the user just typed in sot it can dispaly it on the screen.
// The Solution Applied:
// The Game passes in a function as a prop to the GuessInput. This function will
// catch the data entered into the guess Input and carry out the execution
// of storing it into a state variable.
// this state variable will then be passed as a prop to GetResults to render.
// the purpose of the Event handler function being passed is to capture the value in the
// Guess input and to bring it back up to the Game level component.
// This is a strategy that you can leverage in future development.
// Using Function as props to capture the state value within a react component.
//
