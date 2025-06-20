<template>
  <div class="max-w-2xl mx-auto space-y-8">
    <div class="text-center">
      <h2 class="text-3xl font-bold text-black">Discover Jokes</h2>
    </div>
    
    <!-- Buttons -->
    <div class="text-center space-y-4">
      <!-- Joke Types -->
      <div class="flex justify-center space-x-2">
        <button
          @click="switchJokeType('random')"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
            isRandomType 
              ? 'bg-blue-600 text-white hover:bg-blue-800'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          ]"
        >
          Random Jokes
        </button>
        <button
          @click="switchJokeType('programming')"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
            isProgrammingType 
              ? 'bg-blue-600 text-white hover:bg-blue-800' 
              : 'bg-gray-200 text-black hover:bg-gray-300'
          ]"
        >
          Programming Jokes
        </button>
      </div>
      
      <!-- Get New Joke -->
      <button
        @click="fetchJoke"
        :disabled="isLoading"
        class="bg-green-600 hover:bg-green-800 disabled:bg-green-400 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
      >
        {{ isLoading ? 'Loading...' : 'Get New Joke' }}
      </button>
    </div>

    <!-- Joke Display Area -->
    <div>
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center">
        <div class="animate-pulse">
          <div class="bg-gray-200 rounded-lg p-6 max-w-lg mx-auto">
            <div class="h-4 bg-gray-300 rounded w-16 mb-4"></div>
            <div class="h-6 bg-gray-300 rounded mb-4"></div>
            <div class="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center space-y-4">
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 max-w-lg mx-auto">
          <p class="text-red-800">{{ error }}</p>
        </div>
        <button
          @click="retryFetch"
          class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
      </div>

      <!-- Joke Display -->
      <JokeCard v-else-if="currentJoke" :joke="currentJoke" />

      <!-- Initial State -->
      <div v-else class="text-center">
        <p class="text-black text-xl">Click "Get New Joke" to start!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import JokeCard from './JokeCard.vue'
import { useJokeDiscovery } from '@/composables/useJokeDiscovery'

const {
  currentJoke,
  isLoading,
  error,
  isRandomType,
  isProgrammingType,
  fetchJoke,
  switchJokeType,
  retryFetch
} = useJokeDiscovery()
</script>