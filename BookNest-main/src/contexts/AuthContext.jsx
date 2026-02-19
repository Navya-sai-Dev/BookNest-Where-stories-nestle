import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        console.log('Initial session:', session?.user?.email)
        if (session?.user) {
          setUser(session.user)
          // Don't wait for profile fetch to complete - do it in background
          fetchUserProfile(session.user.id)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user)
          // Don't wait for profile fetch - do it in background
          fetchUserProfile(session.user.id)
          setLoading(false)
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out, clearing state')
          setUser(null)
          setProfile(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId, retryCount = 0) => {
    try {
      console.log('Fetching profile for user:', userId, 'retry:', retryCount)
      
      // Add timeout to prevent hanging
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .abortSignal(controller.signal)
        .single()

      clearTimeout(timeoutId)

      if (error) {
        console.error('Error fetching user profile:', error)
        
        // If profile doesn't exist, create a basic one
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating basic profile')
          const basicProfile = {
            id: userId,
            email: user?.email || '',
            full_name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || '',
            is_admin: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
          setProfile(basicProfile)
          
          // Try to create the profile in the background
          createUserProfile(userId, basicProfile)
        }
        return
      }
      
      console.log('Profile fetched successfully:', data)
      setProfile(data)
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Profile fetch timed out')
      } else {
        console.error('Error in fetchUserProfile:', error)
      }
      
      // Set a basic profile even on error
      if (user) {
        const basicProfile = {
          id: userId,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
          is_admin: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        setProfile(basicProfile)
      }
    }
  }

  const createUserProfile = async (userId, profileData) => {
    try {
      console.log('Creating user profile in background...')
      const { error } = await supabase
        .from('user_profiles')
        .insert([{
          id: userId,
          email: profileData.email,
          full_name: profileData.full_name,
          is_admin: false
        }])
      
      if (error) {
        console.error('Error creating profile:', error)
      } else {
        console.log('Profile created successfully')
        // Refresh the profile data
        fetchUserProfile(userId)
      }
    } catch (error) {
      console.error('Error in createUserProfile:', error)
    }
  }

  const signUp = async (email, password, fullName) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })
      return { data, error }
    } catch (error) {
      console.error('SignUp error:', error)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      console.log('Starting sign in...')
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        console.error('Sign in error:', error)
        return { data, error }
      }
      
      console.log('Sign in successful')
      return { data, error }
    } catch (error) {
      console.error('SignIn error:', error)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      console.log('Starting sign out process...')
      setLoading(true)
      
      // Clear local state immediately for faster UI response
      setUser(null)
      setProfile(null)
      
      // Sign out from Supabase in background
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Supabase signOut error:', error)
      } else {
        console.log('Successfully signed out from Supabase')
      }
      
      // Clear any cached data
      try {
        localStorage.removeItem('supabase.auth.token')
      } catch (e) {
        // Ignore localStorage errors
      }
      
      return { error }
    } catch (error) {
      console.error('SignOut error:', error)
      // Still clear local state even if there's an error
      setUser(null)
      setProfile(null)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates) => {
    if (!user) return { error: { message: 'No user logged in' } }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (!error && data) {
        setProfile(data)
      }

      return { data, error }
    } catch (error) {
      console.error('UpdateProfile error:', error)
      return { data: null, error }
    }
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isAdmin: profile?.is_admin || false
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}