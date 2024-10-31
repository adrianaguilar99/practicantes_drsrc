import React, { useState, useEffect } from 'react';

const TimeCheck: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className='time-clock-body'>
      {time.toLocaleTimeString('en-US', { hour12: false })}
    </div>
  );
};

export default TimeCheck;
