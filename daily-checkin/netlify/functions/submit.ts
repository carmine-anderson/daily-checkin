import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Setup Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Setup Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export default async (request: Request) => {
  console.log("Function called");

  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const body = await request.json();
    console.log("Parsed body:", body);

    const { message, mood } = body;

    // Save to Supabase
    const { data, error } = await supabase.from("checkins").insert([
      { message, mood },
    ]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      return new Response("Supabase insert failed: " + error.message, { status: 500 });
    }

    // Optional: send email via Resend
    // await resend.emails.send({
    //   from: "Check-in App <you@resend.dev>",
    //   to: "your@email.com",
    //   subject: "New Check-in 💖",
    //   html: `<p><strong>Mood:</strong> ${mood}</p><p>${message}</p>`,
    // });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Unhandled error:", err);
    return new Response("Server error: " + String(err), { status: 500 });
  }
};
