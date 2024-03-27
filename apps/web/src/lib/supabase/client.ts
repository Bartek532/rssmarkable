import { createBrowserClient } from "@rssmarkable/database";

import type { SupabaseClient } from "@rssmarkable/database";

let client: SupabaseClient | null = null;

export const supabase = () => {
  if (!client) {
    client = createBrowserClient();
  }

  return client;
};
