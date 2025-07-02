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
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    const body = await request.json();
    const { message, mood } = body;

    const { error } = await supabase.from("checkins").insert([{ message, mood }]);

    if (error) {
      return new Response("Error inserting into Supabase", {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

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
