import { useState } from "react";
import axios from "axios";

const CheckinForm = () => {
    const [message, setMessage] = useState("");
    const [mood, setMood] = useState("🙂");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/submit", { message, mood });
    setSubmitted(true);
};

if (submitted) return <p>Thank you for checking in 💌</p>;

return (
    <form onSubmit={handleSubmit}>
    <label>
        How are you feeling today?
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
        <option>😊</option>
        <option>😐</option>
        <option>😢</option>
        </select>
    </label>
    <br />
    <label>
        Write a quick note:
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
    </label>
    <br />
    <button type="submit">Submit Check-in</button>
    </form>
);
};

export default CheckinForm;
