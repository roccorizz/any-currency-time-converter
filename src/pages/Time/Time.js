import { useState, useEffect } from "react";
import axios from "axios";

function Time() {
    const [timezones, setTimezones] = useState([]);
    const [fromTimezone, setFromTimezone] = useState("America/New_York");
    const [toTimezone, setToTimezone] = useState("Asia/Dhaka");
    const [timeDifference, setTimeDifference] = useState("");
    useEffect(() => {
        axios
            .get("https://worldtimeapi.org/api/timezone")
            .then((response) => {
                setTimezones(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        const fromDatetime = new Date().toLocaleString("en-US", {
            timeZone: fromTimezone,


        });
        const toDatetime = new Date().toLocaleString("en-US", {
            timeZone: toTimezone,


        });
        const diff = (new Date(toDatetime) - new Date(fromDatetime)) / 1000;
        const sign = diff < 0 ? "-" : "+";
        const hours = Math.floor(Math.abs(diff) / 3600);
        const minutes = Math.floor((Math.abs(diff) % 3600) / 60);
        setTimeDifference(`${sign}${hours}:${minutes.toString().padStart(2, "0")}`);
        setTimeout(() => {
            setTimeDifference("");
        }, 3000); // Clear the result after 3 seconds


    }

    return (
        <div>
            <div className="time">
                <form onSubmit={handleSubmit}>
                    <label>
                        From <br />
                        <select
                            value={fromTimezone}
                            onChange={(event) => setFromTimezone(event.target.value)}
                        >
                            {timezones &&
                                timezones.map((zone) => (
                                    <option key={zone} value={zone}>
                                        {zone}
                                    </option>
                                ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        To <br />
                        <select
                            value={toTimezone}
                            onChange={(event) => setToTimezone(event.target.value)}
                        >
                            {timezones &&
                                timezones.map((zone) => (
                                    <option key={zone} value={zone}>
                                        {zone}
                                    </option>
                                ))}
                        </select>
                    </label>
                    <br />
                    <button className="btn" type="submit">
                        Calculate Time Difference
                    </button>
                </form>
                {timeDifference && (
                    <p>
                        The time difference between {fromTimezone} and {toTimezone} is{" "}
                        {timeDifference}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Time;
