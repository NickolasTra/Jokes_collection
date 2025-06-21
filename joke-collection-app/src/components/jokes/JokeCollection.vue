<template>
  <div>
    <!-- Header with Statistics -->
    <div class="text-center mb-8">
      <h3 class="discovery-title">Your Joke Collection</h3>
    </div>

    <div>
      <!-- Empty State -->
      <div v-if="savedJokesLength === 0" class="empty-state">
          <h4 class="text-center text-black text-xl">0 results found</h4>
      </div>

      <!-- Jokes List -->
      <div v-else class="space-y-6">
        <div
          v-for="joke in savedJokesArray"
          :key="`${joke.id}`"
        >
          <JokeCard 
            :joke="joke" 
            :is-in-collection="true"
          />
          <div>
            <p class="text-center mt-2">
              Saved {{ formatDate(joke.savedAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useJokeCollection } from '@/composables/useJokeCollection'
import JokeCard from './JokeCard.vue'

const { savedJokes } = useJokeCollection()

const savedJokesArray = computed(() => savedJokes.value || [])
const savedJokesLength = computed(() => savedJokesArray.value.length)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return 'today'
  } else if (diffDays === 1) {
    return 'yesterday'
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else {
    return date.toLocaleDateString()
  }
}
</script>