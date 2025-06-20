// Basic Joke interface from API
export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

// API response type
export interface JokeResponse {
  error: boolean;
  amount: number;
  jokes?: Joke[];
}

// Joke types we'll support
export type JokeType = 'random' | 'programming';