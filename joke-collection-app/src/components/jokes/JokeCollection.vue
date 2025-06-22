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

    <!-- Search and Filter Controls -->
    <div class="collection-controls">
      <!-- Search Input -->
      <div class="search-container">
        <input v-model="searchQuery" type="text" placeholder="Search jokes..." class="search-input" />
        <div class="search-icon">🔍</div>
      </div>

      <!-- Rating Filter -->
      <div class="filter-container">
        <div class="filter-group">
          <label class="filter-label">Filter by Rating:</label>
          <select v-model="selectedRatingFilter" class="filter-select">
            <option value="all">All Ratings</option>
            <option value="unrated">Unrated</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
      </div>

      <!-- Clear Filters Button -->
      <div v-if="hasActiveFilters" class="clear-filters-container">
        <button @click="clearFilters" class="clear-filters-btn">
          Clear Filters
        </button>
      </div>
    </div>

    <div>
      <!-- Empty State -->
      <div v-if="filteredJokes.length === 0" class="empty-state">
        <h4 class="text-center text-black text-xl">
          {{ savedJokes?.length === 0 ? 'No jokes saved yet' : '0 results found' }}
        </h4>
        <p v-if="savedJokes?.length > 0" class="text-center text-gray-600 mt-2">
          Try again
        </p>
      </div>

      <!-- Jokes List -->
      <div v-if="filteredJokes.length > 0" class="jokes-list">
        <div v-for="joke in filteredJokes" :key="joke.id">
          <JokeCard :joke="joke" :show-rating="true" />
          <div>
            <p class="joke-item-date">
              Saved {{ formatDate(joke.savedAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useJokeCollection } from '@/composables/useJokeCollection'
import JokeCard from './JokeCard.vue'

const { savedJokes, collectionStats } = useJokeCollection()

// Search and filter state
const searchQuery = ref('')
const selectedRatingFilter = ref<string>('all')

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() !== '' || selectedRatingFilter.value !== 'all'
})

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedRatingFilter.value = 'all'
}

// Filter jokes based on search query and rating filter
const filteredJokes = computed(() => {
  if (!savedJokes.value) return []

  let filtered = [...savedJokes.value]

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(joke =>
      joke.setup.toLowerCase().includes(query) ||
      joke.punchline.toLowerCase().includes(query) ||
      joke.type.toLowerCase().includes(query)
    )
  }

  // Apply rating filter
  if (selectedRatingFilter.value !== 'all') {
    if (selectedRatingFilter.value === 'unrated') {
      filtered = filtered.filter(joke => !joke.rating)
    } else {
      const rating = parseInt(selectedRatingFilter.value)
      filtered = filtered.filter(joke => joke.rating === rating)
    }
  }

  return filtered
})

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