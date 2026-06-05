import express from "express";
import cookieParser from "cookie-parser";
import { createClient } from "@supabase/supabase-js";

// Vercel Serverless Function entry point

const app = express();
app.use(express.json());
app.use(cookieParser());

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

app.post("/api/register", async (req, res) => {
  const { full_name, email, phone_number, social_handle } = req.body;
  const access_token = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  const { data, error } = await supabase
    .from("bootcamp_initiates")
    .insert([{ full_name, email, phone_number, social_handle, access_token }])
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ success: true, user: data });
});

app.post("/api/webhook/notify", async (req, res) => {
  const { full_name, phone_number, receipt_url } = req.body;
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    return res.json({ success: true, warning: "Webhook URL not set locally" });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, phone_number, receipt_url }),
    });

    if (!response.ok) {
        return res.status(500).json({ error: "Failed to ping external webhook" });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "External webhook failure" });
  }
});

app.post("/api/initiation/login", async (req, res) => {
  const { token } = req.body;
  
  const { data, error } = await supabase
    .from("bootcamp_initiates")
    .select("*")
    .eq("access_token", token)
    .single();

  if (error || !data) {
    return res.status(401).json({ error: "Token invalid or not found." });
  }

  if (!data.payment_status) {
    return res.status(403).json({ error: "Token valid but payment awaiting verification." });
  }

  res.cookie("vault_session", data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.json({ success: true, user: data });
});

app.get("/api/vault/session", async (req, res) => {
  const token = req.cookies.vault_session;
  if (!token) {
    return res.status(401).json({ error: "No session" });
  }

  const { data, error } = await supabase
    .from("bootcamp_initiates")
    .select("*")
    .eq("access_token", token)
    .single();

  if (error || !data || !data.payment_status) {
    return res.status(401).json({ error: "Invalid session" });
  }

  res.json({ valid: true, user: data });
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("vault_session", { path: "/" });
  res.json({ success: true });
});

export default app;
