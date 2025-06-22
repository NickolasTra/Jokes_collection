<template>
  <div class="joke-card">
    <!-- Joke Type Badge and Heart Icon -->
    <div class="flex justify-between items-start mb-4">
      <span class="joke-badge">
        {{ joke.type }}
      </span>

      <div class="flex items-center space-x-2">
        <!-- Stars Rating -->
        <div v-if="showRating && 'savedAt' in joke" class="flex space-x-1">
          <button v-for="star in 5" :key="star" @click="handleRating(star)"
            :class="['star-button-compact', { 'star-active': star <= (currentRating || 0) }]"
            :title="`Rate ${star} star${star !== 1 ? 's' : ''}`">
            ⭐
          </button>
        </div>

        <!-- Heart Icon -->
        <button @click="toggleSave" :disabled="isSaving || isRemoving" class="heart-button"
          :class="{ 'heart-saving': isSaving || isRemoving }"
          :title="isJokeSaved(joke.id) ? 'Remove from collection' : 'Save to collection'">
          <span class="heart-icon" :class="{ 'heart-filled': isJokeSaved(joke.id) }">
            {{ isJokeSaved(joke.id) ? '❤️' : '🤍' }}
          </span>
        </button>
      </div>
    </div>

    <!-- Joke Setup -->
    <div class="mb-4">
      <p class="joke-setup">
        {{ joke.setup }}
      </p>
    </div>

    <!-- Punchline Section -->
    <div class="flex-1 flex flex-col justify-between">
      <div class="h-12 flex items-center">
        <div v-if="showPunchline" class="transition-all duration-300 ease-in-out w-full">
          <p class="joke-punchline">
            {{ joke.punchline }}
          </p>
        </div>
      </div>

      <div>
        <button v-if="!showPunchline" @click="revealPunchline" class="btn-primary">
          Show Punchline
        </button>

        <button v-else @click="hidePunchline" class="btn-secondary">
          Hide Punchline
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Joke } from '@/types'
import type { SavedJoke } from '@/composables/useJokeCollection'
import { useJokeCollection } from '@/composables/useJokeCollection'

interface Props {
  joke: Joke | SavedJoke
  showRating?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showRating: false
})

const { saveJoke, removeJoke, rateJoke, isJokeSaved } = useJokeCollection()

const showPunchline = ref(false)
const isSaving = ref(false)
const isRemoving = ref(false)
const messageType = ref<'success' | 'error'>('success')
const currentRating = ref<number | undefined>(undefined)

// Initialize rating if this is a saved joke
onMounted(() => {
  if ('savedAt' in props.joke && props.joke.rating) {
    currentRating.value = props.joke.rating
  }
})

const revealPunchline = () => {
  showPunchline.value = true
}

const hidePunchline = () => {
  showPunchline.value = false
}

const handleSaveJoke = async () => {
  isSaving.value = true

  try {
    const success = saveJoke(props.joke)
    if (success) {
      messageType.value = 'success'
    } else {
      messageType.value = 'error'
    }
  } catch (error) {
    messageType.value = 'error'
    console.error('Error saving joke:', error)
  } finally {
    isSaving.value = false
  }
}

const handleRemoveJoke = async () => {
  isRemoving.value = true

  try {
    const success = removeJoke(props.joke.id)
    if (success) {
      messageType.value = 'success'
    } else {
      messageType.value = 'error'
    }
  } catch (error) {
    messageType.value = 'error'
    console.error('Error removing joke:', error)
  } finally {
    isRemoving.value = false
  }
}

const toggleSave = async () => {
  if (isJokeSaved(props.joke.id)) {
    await handleRemoveJoke()
  } else {
    await handleSaveJoke()
  }
}

const handleRating = (rating: number) => {
  const success = rateJoke(props.joke.id, rating)
  if (success) {
    currentRating.value = rating
    messageType.value = 'success'
  } else {
    messageType.value = 'error'
  }
}
</script>