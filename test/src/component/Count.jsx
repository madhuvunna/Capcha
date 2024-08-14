import React, { useState, useEffect } from 'react';
import Login from './Login';

function Count() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000);

    // Clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    
    <div>
         
      {seconds > 0 ? (
       
        <h1>Welcome to Login Portal
          <h6><p>The page will open with in a {seconds} seconds</p></h6> </h1>
      ) : (
        // <h1>Time's up!</h1>
      <Login/>
      )}
    </div>
  );
}

export default Count;
