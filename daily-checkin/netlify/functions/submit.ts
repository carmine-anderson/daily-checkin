import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  try {
    const body = await request.json();
    const { message, mood } = body;

    const { error } = await supabase.from("checkins").insert([
      {
        message,
        mood,
        created_at: new Date().toISOString(), 
      },
    ]);

    if (error) {
      return new Response("Supabase Error: " + error.message, {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    
    await resend.emails.send({
      from: "Daily Check-in <onboarding@resend.dev>",  // static domain
      to: "carmine.anderson@outlook.com",                            
      subject: "📝 New Daily Check-in",
      html: `
  <div style="font-family: sans-serif; padding: 1em;">
    <h2>🧠 Daily Check-in Received</h2>
    <p><strong>Mood:</strong> ${mood}</p>
    <p><strong>Note:</strong> ${message || "No note provided."}</p>
    <hr />
    <p style="font-size: 0.9em; color: gray;">Sent from your daily check-in app</p>
  </div>
`,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response("Server Error", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};
