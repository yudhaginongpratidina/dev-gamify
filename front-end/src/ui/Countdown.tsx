export default function Countdown({days, hours, minutes, seconds} : {days: number, hours: number, minutes: number, seconds: number}) {
    return (
        <div className="flex justify-center space-x-4 mt-4">
            <div className="text-center border-4 border-white rounded-lg p-4 shadow-lg">
                <p className="text-3xl font-bold">{days}</p>
                <p className="text-sm">Days</p>
            </div>
            <div className="text-center border-4 border-white rounded-lg p-4 shadow-lg">
                <p className="text-3xl font-bold">{hours}</p>
                <p className="text-sm">Hours</p>
            </div>
            <div className="text-center border-4 border-white rounded-lg p-4 shadow-lg">
                <p className="text-3xl font-bold">{minutes}</p>
                <p className="text-sm">Minutes</p>
            </div>
            <div className="text-center border-4 border-white rounded-lg p-4 shadow-lg">
                <p className="text-3xl font-bold">{seconds}</p>
                <p className="text-sm">Seconds</p>
            </div>
        </div>
    )
}