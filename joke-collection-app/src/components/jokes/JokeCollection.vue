<template>
  <div>
    <!-- Header with Statistics -->
    <div class="text-center mb-8">
      <h3 class="discovery-title">Your Joke Collection</h3>
      <div class="collection-stats">
        <div class="stat-item">
          <span class="stat-value">{{ collectionStats.totalJokes }}</span>
          <span class="stat-label">Total Jokes</span>
        </div>
        <div class="stat-item" v-if="collectionStats.ratedJokes > 0">
          <span class="stat-value">{{ collectionStats.averageRating }}</span>
          <span class="stat-label">Avg Rating</span>
        </div>
        <div class="stat-item" v-if="collectionStats.ratedJokes > 0">
          <span class="stat-value">{{ collectionStats.ratedJokes }}</span>
          <span class="stat-label">Rated Jokes</span>
        </div>
      </div>
    </div>

    <div>
      <!-- Empty State -->
      <div v-if="savedJokes?.length === 0" class="empty-state">
          <h4 class="text-center text-black text-xl">0 results found</h4>
      </div>

      <!-- Jokes List -->
      <div v-else class="space-y-6">
        <div
          v-for="joke in savedJokes"
          :key="joke.id"
        >
          <JokeCard 
            :joke="joke" 
            :show-rating="true"
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
import { useJokeCollection } from '@/composables/useJokeCollection'
import JokeCard from './JokeCard.vue'

const { savedJokes, collectionStats } = useJokeCollection()

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