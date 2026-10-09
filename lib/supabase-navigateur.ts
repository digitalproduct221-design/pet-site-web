"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/** Client Supabase du navigateur (espace admin), avec la session de l'administrateur. */
export function supabaseNavigateur(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const cle = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !cle) return null;
  client ??= createClient(url, cle, { auth: { persistSession: true, storageKey: "pet-admin" } });
  return client;
}
