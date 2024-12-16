import { supabase } from './client';
import { FetchError } from '@/lib/api/types';

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new FetchError(
        error.message,
        'AUTH_ERROR',
        'Invalid credentials'
      );
    }

    // Verify admin role
    const { data: { role }, error: roleError } = await supabase.rpc('get_user_role');
    
    if (roleError) {
      throw new FetchError(
        'Failed to verify admin role',
        'AUTH_ERROR',
        'Please try again'
      );
    }

    if (role !== 'admin') {
      throw new FetchError(
        'Unauthorized access',
        'AUTH_ERROR',
        'You do not have admin privileges'
      );
    }

    return { user: data.user, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { 
      user: null, 
      error: error instanceof FetchError ? error : new Error('Authentication failed')
    };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}