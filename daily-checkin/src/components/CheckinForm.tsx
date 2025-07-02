import { useState } from "react";
import axios from "axios";

const CheckinForm = () => {
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState("🙂");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/.netlify/functions/submit", { message, mood });
    setSubmitted(true);
  };

  if (submitted)
    return <p style={{ textAlign: "center", color: "lightgreen" }}>Thank you for checking in 💌</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="mood">How are you feeling today?</label>
      <select id="mood" value={mood} onChange={(e) => setMood(e.target.value)}>
        <option>😊</option>
        <option>😐</option>
        <option>😢</option>
      </select>

      <label htmlFor="message">Write a quick note:</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <button type="submit">Submit Check-in</button>
    </form>
  );
};

export default CheckinForm;
