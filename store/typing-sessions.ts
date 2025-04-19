import { create } from 'zustand';
import { toast } from '@/components/ui/use-toast';
import { Database } from '@/types/supabase';
import { createClient } from '@supabase/supabase-js';

type TypingSession = Database['public']['Tables']['typing_sessions']['Insert'];
type SaveSessionStatus = 'idle' | 'loading' | 'success' | 'error';

interface TypingSessionsState {
  status: SaveSessionStatus;
  error: string | null;
  isSaving: boolean;
  
  // Actions
  saveSession: (sessionData: Omit<TypingSession, 'user_id'>, userId: string, authToken: string) => Promise<void>;
  reset: () => void;
}

export const useTypingSessionsStore = create<TypingSessionsState>((set) => ({
  status: 'idle',
  error: null,
  isSaving: false,
  
  saveSession: async (sessionData, userId, authToken) => {
    if (!userId || !authToken) {
      set({ status: 'error', error: 'User not authenticated' });
      toast({ 
        title: 'Authentication Error', 
        description: 'You must be signed in to save typing sessions.',
        variant: 'destructive'
      });
      return;
    }

    set({ status: 'loading', isSaving: true, error: null });
    
    try {
      const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!,
        {
          async accessToken() {
            return authToken
          }
        }
      );
      
      const { error } = await supabase
        .from('typing_sessions')
        .insert({
          user_id: userId,
          wpm: sessionData.wpm,
          accuracy: sessionData.accuracy,
          duration_seconds: sessionData.duration_seconds,
        });
      
      if (error) {
        throw new Error(error.message);
      }
      
      set({ status: 'success', isSaving: false });
      toast({
        title: 'Session Saved',
        description: 'Your typing session has been saved successfully!',
        variant: 'success',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save session';
      set({ 
        status: 'error', 
        error: errorMessage,
        isSaving: false 
      });
      toast({
        title: 'Error Saving Session',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  },
  
  reset: () => {
    set({ status: 'idle', error: null, isSaving: false });
  },
})); 