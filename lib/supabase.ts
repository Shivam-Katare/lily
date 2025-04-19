import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';
import { useSession } from '@clerk/nextjs';
import { Database } from '@/types/supabase';

// Create a Supabase client for use in server components or API routes
export function createServerSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        async accessToken() {
          return (await auth()).getToken()
        },
      },
    )
  }

// Create a Supabase client for use in client components
export function createClientSupabaseClient() {
  const { session } = useSession();
  
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      async accessToken() {
        return session ? await session.getToken() : null
      },
    }
  );
}