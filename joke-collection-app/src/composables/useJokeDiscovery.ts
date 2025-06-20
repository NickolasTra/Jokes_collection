import { ref, computed } from 'vue'
import type { Joke, JokeType } from '@/types'
import { JokeApiService } from '@/services/jokeApi'

export function useJokeDiscovery() {
  const currentJoke = ref<Joke | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const jokeType = ref<JokeType>('random')

  const isRandomType = computed(() => jokeType.value === 'random')
  const isProgrammingType = computed(() => jokeType.value === 'programming')

  // Fetch a new joke
  const fetchJoke = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      const joke = await JokeApiService.getJokeByType(jokeType.value)
      currentJoke.value = joke
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred'
      console.error('Failed to fetch joke:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Switch joke type and fetch new joke
  const switchJokeType = async (newType: JokeType) => {
    jokeType.value = newType
    await fetchJoke()
  }

  // Retry fetching current joke
  const retryFetch = async () => {
    await fetchJoke()
  }

  return {
    // State
    currentJoke,
    isLoading,
    error,
    jokeType,
    
    // Computed
    isRandomType,
    isProgrammingType,
    
    // Actions
    fetchJoke,
    switchJokeType,
    retryFetch
  }
}