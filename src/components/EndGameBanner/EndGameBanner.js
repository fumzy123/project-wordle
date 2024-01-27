import React from 'react';

function EndGameBanner({ gameStatus, noOfAttempts }) {
  // Create React Element
  let message = <></>;
  if (gameStatus === 'won') {
    message = (
      <>
        <strong>Congratulations!</strong> Got it in{' '}
        <strong>{noOfAttempts} guesses</strong>
      </>
    );
  } else if (gameStatus === 'lost') {
    message = (
      <>
        Sorry the correct answer is <strong>LEARN</strong>.
      </>
    );
  } else {
    message = <></>;
  }

  // Render
  return (
    <div
      className={`${
        gameStatus === 'won'
          ? 'happy'
          : gameStatus === 'lost'
          ? 'sad'
          : ''
      } banner`}
    >
      <p>{message}</p>
    </div>
  );
}

export default EndGameBanner;
