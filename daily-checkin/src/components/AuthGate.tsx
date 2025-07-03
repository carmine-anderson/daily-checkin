// src/components/AuthGate.tsx
import { useState, useEffect } from "react";

const PASSWORD = "070624"; // <<< set the real password here

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("auth-ok");
    if (stored === "true") {
      setAuthorized(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      setAuthorized(true);
      localStorage.setItem("auth-ok", "true");
    } else {
      alert("Incorrect password");
    }
  };

  if (authorized) return <>{children}</>;

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h2>🔒 Enter Password to Continue</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Password"
          style={{ padding: "10px", fontSize: "1rem", marginTop: "10px" }}
        />
        <br />
        <button
          type="submit"
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            fontSize: "1rem",
          }}
        >
          Unlock
        </button>
      </form>
    </div>
  );
}
