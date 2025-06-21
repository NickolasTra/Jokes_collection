import { ref, computed } from 'vue'
import type { Joke } from '@/types'

export interface SavedJoke extends Joke {
  savedAt: string
}

let sharedState: {
  savedJokes: ReturnType<typeof ref<SavedJoke[]>>
  isInitialized: boolean
} | null = null

export function useJokeCollection() {
  if (!sharedState) {
    sharedState = {
      savedJokes: ref<SavedJoke[]>([]),
      isInitialized: false
    }
  }

  const savedJokes = sharedState.savedJokes

  // Load jokes from localStorage on initialization
  const loadCollection = () => {
    if (sharedState!.isInitialized) return
    
    try {
      const stored = localStorage.getItem('joke-collection')
      if (stored) {
        savedJokes.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load collection from localStorage:', error)
      savedJokes.value = []
    }
    
    sharedState!.isInitialized = true
  }

  // Save jokes to localStorage
  const saveToStorage = () => {
    try {
      localStorage.setItem('joke-collection', JSON.stringify(savedJokes.value))
    } catch (error) {
      console.error('Failed to save collection to localStorage:', error)
    }
  }

  // Check if a joke is already saved
  const isJokeSaved = (jokeId: number) => {
    if (!savedJokes.value) return false
    return savedJokes.value.some(joke => joke.id === jokeId)
  }

  // Add a joke to collection
  const saveJoke = (joke: Joke) => {
    if (isJokeSaved(joke.id)) {
      return false // Already saved
    }

    const savedJoke: SavedJoke = {
      ...joke,
      savedAt: new Date().toISOString()
    }

    // Ensure savedJokes.value is initialized
    if (!savedJokes.value) {
      savedJokes.value = []
    }

    savedJokes.value.unshift(savedJoke) // Add to beginning
    saveToStorage()
    return true
  }

  // Remove a joke from collection
  const removeJoke = (jokeId: number) => {
    // Ensure savedJokes.value exists
    if (!savedJokes.value) {
      return false
    }

    const index = savedJokes.value.findIndex(joke => joke.id === jokeId)
    if (index !== -1) {
      savedJokes.value.splice(index, 1)
      saveToStorage()
      return true
    }
    return false
  }

  // Collection statistics
  const collectionStats = computed(() => {
    const total = savedJokes.value?.length || 0

    return {
      totalJokes: total
    }
  })

  // Initialize collection on first use
  loadCollection()

  return {
    // State
    savedJokes,
    
    // Computed
    collectionStats,
    
    // Actions
    saveJoke,
    removeJoke,
    isJokeSaved,
    loadCollection
  }
}