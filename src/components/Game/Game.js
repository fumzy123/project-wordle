// Packages
import React, { useState } from 'react';

// Smaller React Components
import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';

// Utilities and Data
import { sample } from '../../utils';
import { WORDS } from '../../data';
import EndGameBanner from '../EndGameBanner/EndGameBanner';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  // UseState
  // A State to hold all the previous guess Attempts
  const [guessList, setGuessList] = useState([]);
  const [gameStatus, setGameStatus] = useState('running');

  //--------------- Constant Variables ---------------------------------
  const showEndGameBanner = gameStatus !== 'running';

  //--------------- Game Helper Function---------------------------------
  function updateGameStatus(result) {
    if (result) {
      // Check if all the letters in the word are correct
      const correctGuess = result.every((letterobject) => {
        return letterobject.status === 'correct';
      });

      if (
        correctGuess &&
        guessList.length <= NUM_OF_GUESSES_ALLOWED
      ) {
        setGameStatus('won');
        return;
      }

      if (
        !correctGuess &&
        guessList.length === NUM_OF_GUESSES_ALLOWED
      ) {
        setGameStatus('lost');
        return;
      }
    }
  }

  //--------------- Event Handlers---------------------------------
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

  //--------------- Render Game ---------------------------------
  return (
    <>
      <GuessResults
        guessList={guessList}
        answer={answer}
        updateGameStatus={updateGameStatus}
      />
      <GuessInput handleSubmitGuess={handleSubmitGuess} />
      {showEndGameBanner && (
        <EndGameBanner
          gameStatus={gameStatus}
          noOfAttempts={guessList.length}
        />
      )}
    </>
  );
}

export default Game;

// Context:
//    I understand that GuessInput and Guess Results are two separate components.
// Problem:
//    The GuessResults component needs to access the previous guesses that
//    the user typed into the GuessInput Component so it can dispaly it on the screen.
//    For this to work the state has to be in the parent Component of the GuessResults and GuessInput Components.
//
// The Solution Applied:
// The Game passes in a function as a prop to the GuessInput. This function will
// catch the data entered into the GuessInput Component and carry out the execution
// of adding the data to the guessList state in the Parent Component.
//
// the guessList state variable will then be passed as a prop to GetResults to render.
// the purpose of the Event handler function being passed is to capture the value in the
// Guess input and to bring it back up to the Game level component.
//
// This is a strategy that I can leverage in future development.
// Using Function as props to capture the data or state used in a child component
// and lifting it to the parent to perform some operation.
//
