"use server";

import { createClient } from "@supabase/supabase-js";
import { updateTag } from "next/cache";
import { ETIQUETTES, type Etiquette } from "@/lib/contenu";

/**
 * Met le site à jour après une modification dans l'espace admin.
 * Le jeton de session est vérifié et l'utilisateur doit figurer parmi les
 * administrateurs : personne d'autre ne peut vider le cache.
 */
export async function rafraichirSite(jeton: string, etiquettes: Etiquette[]) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const cle = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !cle || !jeton) return { ok: false };
  const supabase = createClient(url, cle, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${jeton}` } },
  });
  const { data: utilisateur } = await supabase.auth.getUser(jeton);
  if (!utilisateur.user) return { ok: false };
  const { data: admin } = await supabase.from("admins").select("user_id").eq("user_id", utilisateur.user.id).maybeSingle();
  if (!admin) return { ok: false };
  for (const e of etiquettes) if ((ETIQUETTES as readonly string[]).includes(e)) updateTag(e);
  return { ok: true };
}
