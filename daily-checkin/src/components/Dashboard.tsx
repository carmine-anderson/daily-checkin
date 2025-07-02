import { useEffect, useState } from "react";
import "./Dashboard.css";

type Checkin = {
    id: number;
    mood: string;
    message: string;
    created_at: string;
};

const Dashboard = () => {
    const [checkins, setCheckins] = useState<Checkin[]>([]);

    useEffect(() => {
    fetch("https://jazzy-syrniki-7bea9d.netlify.app/.netlify/functions/getCheckins")
    .then(res => res.json())
    .then(data => setCheckins(data))
    .catch(err => console.error("Error loading check-ins:", err));
}, []);

return (
    <div className="dashboard">
    <h2>Your Past Check-ins</h2>
    <ul>
        {checkins.map((entry) => (
        <li key={entry.id}>
            <span>{new Date(entry.created_at).toLocaleDateString()}</span> — 
            <strong> {entry.mood}</strong>: {entry.message}
        </li>
        ))}
    </ul>
    </div>
);
};

export default Dashboard;
