<template>
  <div class="discovery-container">
    <div class="text-center">
      <h2 class="discovery-title">Discover Jokes</h2>
    </div>

    <!-- Buttons -->
    <div class="text-center space-y-4">
      <!-- Joke Types -->
      <div class="flex justify-center space-x-2">
        <button @click="switchJokeType('random')" :class="['toggle-button', { 'toggle-button-active': isRandomType }]">
          Random Jokes
        </button>
        <button @click="switchJokeType('programming')"
          :class="['toggle-button', { 'toggle-button-active': isProgrammingType }]">
          Programming Jokes
        </button>
      </div>

      <!-- Get New Joke -->
      <button @click="fetchJoke" :disabled="isLoading"
        class="btn-green">
        {{ isLoading ? 'Loading...' : 'Get New Joke' }}
      </button>
    </div>

    <!-- Joke Display Area -->
    <div>
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center">
        <div class="animate-pulse">
          <div class="loading-card">
            <div class="loading-line-short"></div>
            <div class="loading-line-wide"></div>
            <div class="loading-line-medium"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center space-y-4">
        <div class="error-card">
          <p class="text-red-800">{{ error }}</p>
        </div>
        <button @click="retryFetch"
          class="btn-error">
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