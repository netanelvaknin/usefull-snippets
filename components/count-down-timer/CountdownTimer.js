import React, { useState, useEffect } from 'react';
import { TimeLeft } from './CountdownTimerStyle';
import dayjs from 'dayjs';

interface CountdownTimerProps {
    toDate: Date;
    className?: string;
}

export const CountdownTimer = ({ toDate, className }: CountdownTimerProps) => {
    const diffInMilliSeconds = toDate.getTime() - new Date().getTime();

    const [timeLeft, setTimeLeft] = useState({
        hours: String(dayjs.duration(diffInMilliSeconds).hours()).padStart(2, '0'),
        minutes: String(dayjs.duration(diffInMilliSeconds).minutes()).padStart(2, '0'),
        seconds: String(dayjs.duration(diffInMilliSeconds).seconds()).padStart(2, '0')
    });

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        // Stop running useEffect when time is ended
        if (diffInMilliSeconds > 0) {
            timeout = setTimeout(() => {
                setTimeLeft({
                    hours: String(dayjs.duration(diffInMilliSeconds).hours()).padStart(2, '0'),
                    minutes: String(dayjs.duration(diffInMilliSeconds).minutes()).padStart(2, '0'),
                    seconds: String(dayjs.duration(diffInMilliSeconds).seconds()).padStart(2, '0')
                })
            }, 1000);
        }

        return () => {
            // cleanup
            clearTimeout(timeout);
        }
    }, [timeLeft]);

    return (
        <>
            {(diffInMilliSeconds < 0) ? ( // Time is ended
                <TimeLeft className={className}>00:00:00</TimeLeft>
            ) : (
                    <TimeLeft className={className}>{`${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}</TimeLeft>
                )}
        </>
    )
};

export default CountdownTimer;