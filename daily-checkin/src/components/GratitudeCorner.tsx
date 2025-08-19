import { useEffect, useState } from 'react';
import axios from 'axios';
import './GratitudeCorner.css';

type GratitudeEntry = {
  id: string;
  message: string;
  created_at: string;
};

const GratitudeCorner = () => {
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);

  const fetchEntries = async () => {
    try {
      const res = await axios.get('/.netlify/functions/getGratitude');
      setEntries(res.data);
    } catch (err) {
      console.error('Failed to fetch gratitude entries:', err);
    }
  };

  const submitGratitude = async () => {
    if (!message.trim()) return;

    try {
      await axios.post('/.netlify/functions/submitGratitude', { message });
      setMessage('');
      fetchEntries();
    } catch (err) {
      console.error('Error submitting gratitude:', err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="gratitude-container">
      <h2>Gratitude Corner</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="What are you grateful for today?"
      />
      <button onClick={submitGratitude}>Submit</button>
      <div className="gratitude-entries">
        {entries.map((entry) => (
          <div key={entry.id} className="gratitude-entry">
            <strong>{new Date(entry.created_at).toLocaleDateString()}</strong>
            <p>{entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GratitudeCorner;
