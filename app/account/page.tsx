'use client';

import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSupabase } from '@/lib/hooks/use-supabase';
import { Database } from '@/types/supabase';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const supabase = useSupabase();
  const [profile, setProfile] = useState<Database['public']['Tables']['profiles']['Row'] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user || !supabase) return;
    
    async function fetchProfile() {
      setLoading(true);
      
      if (!supabase) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
      
      setLoading(false);
    }
    
    fetchProfile();
  }, [user, isLoaded, supabase]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <Link 
        href="/" 
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </Link>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-serif mb-8">Your Account</h1>
        
        {loading ? (
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
              {user?.imageUrl && (
                <img 
                  src={user.imageUrl} 
                  alt={user.fullName || "User profile"} 
                  className="h-24 w-24 rounded-full object-cover border-2 border-border"
                />
              )}
              
              <div>
                <h2 className="text-2xl font-medium">{user?.fullName || user?.username}</h2>
                <p className="text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-medium mb-4">Profile Information</h3>
              
              {profile ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p>{profile.full_name || "Not set"}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{profile.email || "Not set"}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Account Created</p>
                    <p>{profile.created_at ? new Date(profile.created_at).toLocaleDateString() : "Unknown"}</p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No profile data found.</p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
} 