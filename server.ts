import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cookieParser from "cookie-parser";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

// Initialize Server-side Supabase client (using Service Role for secure bypass if needed, but here we can just use anon if not defined)
const supabaseUrl = process.env.VITE_SUPABASE_URL || "http://placeholder.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || "placeholder";
const supabase = createClient(supabaseUrl, supabaseKey);

// API 1: Server action to register user and generate token
app.post("/api/register", async (req, res) => {
  const { full_name, email, phone_number, social_handle } = req.body;
  
  // Generate a 6-character alphanumeric access token
  const access_token = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  const { data, error } = await supabase
    .from("bootcamp_initiates")
    .insert([
      {
        full_name,
        email,
        phone_number,
        social_handle,
        access_token,
      }
    ])
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ success: true, user: data });
});

// API 2: Webhook ping after upload
app.post("/api/webhook/notify", async (req, res) => {
  const { full_name, phone_number, receipt_url } = req.body;
  
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("WEBHOOK_URL not configured. Skipping external ping.");
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

// API 3: The Gatekeeper (Initiation)
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

  // Set HTTP-only cookie indicating secure session
  res.cookie("vault_session", data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.json({ success: true, user: data });
});

// API 4: Vault Session check
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

// API 5: Logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("vault_session");
  res.json({ success: true });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
