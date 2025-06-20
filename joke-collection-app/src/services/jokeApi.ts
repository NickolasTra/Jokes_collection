import type { Joke, JokeType } from '@/types'

const BASE_URL = 'https://official-joke-api.appspot.com'

export class JokeApiService {
  // Fetch a random joke
  static async getRandomJoke(): Promise<Joke> {
    try {
      const response = await fetch(`${BASE_URL}/random_joke`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const joke: Joke = await response.json()
      return joke
    } catch (error) {
      console.error('Error fetching random joke:', error)
      throw new Error('Failed to fetch random joke. Please try again.')
    }
  }

  // Fetch a programming joke
  static async getProgrammingJoke(): Promise<Joke> {
    try {
      const response = await fetch(`${BASE_URL}/jokes/programming/random`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const jokes: Joke[] = await response.json()
      
      if (!jokes || jokes.length === 0) {
        throw new Error('No programming jokes available')
      }
      
      return jokes[0]
    } catch (error) {
      console.error('Error fetching programming joke:', error)
      throw new Error('Failed to fetch programming joke. Please try again.')
    }
  }

  // Fetch based on Type
  static async getJokeByType(type: JokeType): Promise<Joke> {
    return type === 'programming' 
      ? this.getProgrammingJoke() 
      : this.getRandomJoke()
  }
}