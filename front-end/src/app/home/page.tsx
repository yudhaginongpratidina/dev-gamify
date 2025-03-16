"use client";
import { useState, useEffect } from 'react';

export default function Page() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const targetDate = new Date('2025-04-30T23:59:59');
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <div className="bg-gray-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">{timeLeft.days}</div>
                    <div>Days</div>
                </div>
                <div className="bg-gray-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">{timeLeft.hours}</div>
                    <div>Hours</div>
                </div>
                <div className="bg-gray-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                    <div>Minutes</div>
                </div>
                <div className="bg-gray-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                    <div>Seconds</div>
                </div>
            </div>
        </div>
    );
}