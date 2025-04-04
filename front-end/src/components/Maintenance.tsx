"use client"
import { useState, useEffect } from "react";
import Countdown from "@/ui/Countdown";

export default function Maintenance() {
    const [countdown, setCountdown] = useState({
        date: new Date(`${process.env.NEXT_PUBLIC_MAINTENANCE_TIME}`),
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const difference = countdown.date.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(interval);
                setCountdown((prev) => ({ ...prev, days: 0, hours: 0, minutes: 0, seconds: 0 }));
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setCountdown((prev) => ({ ...prev, days, hours, minutes, seconds }));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown.date]);

    return (
        <div className="p-4 flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 select-none">
            <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">Under Maintenance</h1>
                <p className="text-lg mb-6">We are currently working hard to improve your experience. Stay tuned!</p>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold">Countdown:</h2>
                    <Countdown days={countdown.days} hours={countdown.hours} minutes={countdown.minutes} seconds={countdown.seconds}/>
                </div>
            </div>
        </div>
    );
}
