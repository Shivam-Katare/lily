'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSession } from '@clerk/nextjs';
import { Database } from '@/types/supabase';

export function useSupabase() {
  const { session } = useSession();
  const [supabase, setSupabase] = useState<ReturnType<typeof createClient<Database>> | null>(null);

  useEffect(() => {
    async function createSupabaseClient() {
      const client = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!,
        {
          async accessToken() {
            return session ? await session.getToken() : null
          },
        }
      );
      
      setSupabase(client);
    }

    createSupabaseClient();
  }, [session]);

  return supabase;
} 