// netlify/functions/getCheckins.ts

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export const handler = async () => {
  const { data, error } = await supabase.from("checkins").select("*");

  console.log("Fetched check-ins:", data);

  if (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: `Supabase error: ${error.message}`,
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};
