// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [targetDate, setTargetDate] = useState('');
  const [countdown, setCountdown] = useState({});
  const [intervalId, setIntervalId] = useState(null);
  const [isCounting, setIsCounting] = useState(false);

  const handleChange = (e) => {
    setTargetDate(e.target.value);
  };

  const toggleCountdown = () => {
    if (!isCounting) {
      startCountdown();
    } else {
      stopCountdown();
    }
  };

  const startCountdown = () => {
    const endDate = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance <= 0) {
      alert('Please select a future date and time.');
      return;
    }

    const timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown({ days, hours, minutes, seconds });

      if (distance <= 0) {
        clearInterval(timerInterval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        alert('Countdown completed!');
      }
    }, 1000);

    setIntervalId(timerInterval);
    setIsCounting(true);
  };

  const stopCountdown = () => {
    clearInterval(intervalId);
    setCountdown({});
    setTargetDate('');
    setIsCounting(false);
  };

  return (
    <div className="App">
      <div className="content">
        <h1>Countdown Timer</h1>
        <div className="input-container">
          <input type="datetime-local" value={targetDate} onChange={handleChange} />
        
          <button onClick={toggleCountdown}>{isCounting ? 'Stop Countdown' : 'Start Countdown'}</button>
        </div>
        <div className="countdown-container">
          <div className="countdown-item">
            <span>{countdown.days}</span>
            <div>Days</div>
          </div>
          <div className="countdown-item">
            <span>{countdown.hours}</span>
            <div>Hours</div>
          </div>
          <div className="countdown-item">
            <span>{countdown.minutes}</span>
            <div>Minutes</div>
          </div>
          <div className="countdown-item">
            <span>{countdown.seconds}</span>
            <div>Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
