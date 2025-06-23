import { ref, computed } from 'vue'
import type { Joke } from '@/types'

export interface SavedJoke extends Joke {
  savedAt: string
  rating?: number
}

// Shared across all instances
const savedJokes = ref<SavedJoke[]>([])
let isInitialized = false

// Load collection
const loadCollection = () => {
  if (isInitialized) return
  
  try {
    const stored = localStorage.getItem('joke-collection')
    if (stored) {
      savedJokes.value = JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load collection from localStorage:', error)
    savedJokes.value = []
  }
  
  isInitialized = true
}

// Save jokes to localStorage
const saveToStorage = () => {
  try {
    localStorage.setItem('joke-collection', JSON.stringify(savedJokes.value))
  } catch (error) {
    console.error('Failed to save collection to localStorage:', error)
  }
}

// Initialize
loadCollection()

export function useJokeCollection() {
  // Check if a joke is already saved
  const isJokeSaved = (jokeId: number) => {
    return savedJokes.value.some(joke => joke.id === jokeId)
  }

  // Add a joke to collection
  const saveJoke = (joke: Joke) => {
    if (isJokeSaved(joke.id)) {
      return false
    }

    const savedJoke: SavedJoke = {
      ...joke,
      savedAt: new Date().toISOString(),
      rating: undefined
    }

    savedJokes.value.unshift(savedJoke)
    saveToStorage()
    return true
  }

  // Remove a joke from collection
  const removeJoke = (jokeId: number) => {
    const index = savedJokes.value.findIndex(joke => joke.id === jokeId)
    if (index !== -1) {
      savedJokes.value.splice(index, 1)
      saveToStorage()
      return true
    }
    return false
  }

  // Rate a joke (1-5 stars)
  const rateJoke = (jokeId: number, rating: number) => {
    const joke = savedJokes.value.find(joke => joke.id === jokeId)
    if (joke && rating >= 1 && rating <= 5) {
      joke.rating = rating
      saveToStorage()
      return true
    }
    return false
  }

  // Collection statistics
  const collectionStats = computed(() => {
    const total = savedJokes.value.length
    const ratedJokes = savedJokes.value.filter(joke => joke.rating !== undefined)
    const totalRating = ratedJokes.reduce((sum, joke) => sum + (joke.rating || 0), 0)
    const averageRating = ratedJokes.length > 0 ? totalRating / ratedJokes.length : 0

    return {
      totalJokes: total,
      ratedJokes: ratedJokes.length,
      averageRating: Math.round(averageRating * 10) / 10
    }
  })

  return {
    // State
    savedJokes,
    
    // Computed
    collectionStats,
    
    // Actions
    saveJoke,
    removeJoke,
    rateJoke,
    isJokeSaved,
    loadCollection
  }
}