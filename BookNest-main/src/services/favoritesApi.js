import { supabase } from '../lib/supabase'

export const getUserFavorites = async () => {
  try {
    console.log('Getting user favorites...')
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      console.error('Error getting user:', userError)
      throw userError
    }
    
    if (!user) {
      console.log('No user found')
      return []
    }

    console.log('User authenticated, fetching favorites for:', user.id)
    const { data, error } = await supabase
      .from('user_favorites')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Supabase error fetching favorites:', error)
      throw error
    }
    
    console.log('Favorites fetched successfully:', data?.length || 0, 'items')
    return data || []
  } catch (error) {
    console.error('Error fetching favorites:', error)
    // Return empty array instead of throwing to prevent infinite loading
    return []
  }
}

export const addToFavorites = async (bookId, bookData) => {
  try {
    console.log('Adding to favorites:', bookId)
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      console.error('Error getting user:', userError)
      throw userError
    }
    
    if (!user) {
      console.log('No user found for adding favorite')
      throw new Error('User not authenticated')
    }

    const { data, error } = await supabase
      .from('user_favorites')
      .insert([{
        user_id: user.id,
        book_id: bookId,
        book_data: bookData
      }])
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error adding favorite:', error)
      throw error
    }
    
    console.log('Added to favorites successfully:', data)
    return data
  } catch (error) {
    console.error('Error adding to favorites:', error)
    throw error
  }
}

export const removeFromFavorites = async (bookId) => {
  try {
    console.log('Removing from favorites:', bookId)
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      console.error('Error getting user:', userError)
      throw userError
    }
    
    if (!user) {
      console.log('No user found for removing favorite')
      throw new Error('User not authenticated')
    }

    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('book_id', bookId)
      .eq('user_id', user.id)
    
    if (error) {
      console.error('Supabase error removing favorite:', error)
      throw error
    }
    
    console.log('Removed from favorites successfully')
    return true
  } catch (error) {
    console.error('Error removing from favorites:', error)
    throw error
  }
}

export const isFavorite = async (bookId) => {
  try {
    console.log('Checking if favorite:', bookId)
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      console.error('Error getting user:', userError)
      return false
    }
    
    if (!user) {
      console.log('No user found for checking favorite')
      return false
    }

    const { data, error } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('book_id', bookId)
      .eq('user_id', user.id)
      .limit(1)
    
    if (error) {
      console.error('Supabase error checking favorite:', error)
      return false
    }
    
    const isFav = data && data.length > 0
    console.log('Is favorite result:', isFav)
    return isFav
  } catch (error) {
    console.error('Error checking favorite status:', error)
    return false
  }
}