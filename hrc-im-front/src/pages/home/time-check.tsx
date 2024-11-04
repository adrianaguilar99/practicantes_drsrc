import React, { useState, useEffect } from 'react';
import { postAttendance } from '../../api/attendances/attendances.api';
import { PostAttendance, PostAttendanceResponse } from '../../interfaces/attendances/attendances.interface';
import { enqueueSnackbar } from 'notistack';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const TimeCheck: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [internCode, setInternCode] = useState('');
  const [messageMode, setMessageMode] = useState(false);
  const [message, setMessage] = useState('');

  const sendAttendance = async (code: string) => {
    try {
      const response: PostAttendanceResponse = await postAttendance({ internCode: code } as PostAttendance);
      if(response.statusCode === 400) {
        setMessage(response.message);
        setMessageMode(true);
      }else if (!response.message) {
        enqueueSnackbar("Error al hacer la solicitud", { variant: "error" });
      } else {
        console.log("Attendance posted successfully");
        setMessage(response.message);
        setMessageMode(true);
      }
    } catch (error) {
      enqueueSnackbar("Error al hacer la solicitud", { variant: "error" });
    } finally {
      setInternCode(''); 
    }
  };

  useEffect(() => {
    if (internCode.length === 6) {
      sendAttendance(internCode);
    }
  }, [internCode]);

  useEffect(() => {
    if (messageMode) {
      const timer = setTimeout(() => {
        setMessageMode(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [messageMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='time-clock-body'>
      {messageMode ? (
        <div className='time-clock-message'>
        {message.includes("exit") ? <LogoutIcon sx={{ fontSize: 60 }} /> : <LoginIcon sx={{ fontSize: 60 }} />}

        <h5>{message}</h5>
        </div>
      ) : (
        <div className='time-clock-content'>
          {time.toLocaleTimeString('en-US', { hour12: false })} de {time.toLocaleDateString('en-US')}
          <h5>Bienvenido hacerca tu tarjeta de practicante al escaner </h5>
          <input
            type="text"
            value={internCode}
            onChange={(e) => setInternCode(e.target.value)}
            maxLength={6} 
            autoFocus 
          />
        </div>
      )}
    </div>
  );
};

export default TimeCheck;
