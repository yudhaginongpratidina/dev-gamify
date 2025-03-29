"use client"
import { useState, useEffect } from "react";

export default function FeatureMaintenance({ feature, date }: { feature: any, date: any }) {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const targetDate = new Date(date);
        if (isNaN(targetDate.getTime())) {
            console.error("Invalid date provided to FeatureMaintenance component.");
            return;
        }

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(interval);
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setCountdown({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [date]);

    return (
        <div className="flex items-center justify-center h-[84vh] bg-gradient-to-r from-blue-500 to-purple-600 rounded-sm select-none">
            <div className="text-center text-white">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 capitalize">{feature} <br /> under maintenance</h1>
                <p className="text-base sm:text-lg mb-6">We are currently working hard to improve your experience. Stay tuned!</p>
                <div className="mb-6">
                    <div className="flex justify-center space-x-2 sm:space-x-4 mt-4">
                        <div className="text-center border-4 border-white rounded-lg p-2 sm:p-4 shadow-lg">
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold">{countdown.days}</p>
                            <p className="text-xs sm:text-sm">Days</p>
                        </div>
                        <div className="text-center border-4 border-white rounded-lg p-2 sm:p-4 shadow-lg">
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold">{countdown.hours}</p>
                            <p className="text-xs sm:text-sm">Hours</p>
                        </div>
                        <div className="text-center border-4 border-white rounded-lg p-2 sm:p-4 shadow-lg">
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold">{countdown.minutes}</p>
                            <p className="text-xs sm:text-sm">Minutes</p>
                        </div>
                        <div className="text-center border-4 border-white rounded-lg p-2 sm:p-4 shadow-lg">
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold">{countdown.seconds}</p>
                            <p className="text-xs sm:text-sm">Seconds</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
