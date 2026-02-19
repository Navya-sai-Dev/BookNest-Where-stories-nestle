import { supabase } from '../lib/supabase'

export const getLocalBooks = async () => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching local books:', error)
    throw error
  }
}

export const addLocalBook = async (bookData) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .insert([{
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        cover_image: bookData.coverImage,
        category: bookData.category,
        publisher: bookData.publisher,
        published_date: bookData.publishedDate,
        page_count: bookData.pageCount
      }])
      .select()
    
    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Error adding local book:', error)
    throw error
  }
}

export const updateLocalBook = async (id, bookData) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .update({
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        cover_image: bookData.coverImage,
        category: bookData.category,
        publisher: bookData.publisher,
        published_date: bookData.publishedDate,
        page_count: bookData.pageCount
      })
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Error updating local book:', error)
    throw error
  }
}

export const deleteLocalBook = async (id) => {
  try {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting local book:', error)
    throw error
  }
}

export const getLocalBookById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching local book:', error)
    throw error
  }
}