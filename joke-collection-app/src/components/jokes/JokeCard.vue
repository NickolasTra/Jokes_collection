<template>
  <div class="joke-card">
    <!-- Joke Type Badge and Heart Icon -->
    <div class="flex justify-between items-start mb-4">
      <span class="joke-badge">
        {{ joke.type }}
      </span>
      
      <!-- Heart Icon -->
      <button
        @click="toggleSave"
        :disabled="isSaving || isRemoving"
        class="heart-button"
        :class="{ 'heart-saving': isSaving || isRemoving }"
        :title="isJokeSaved(joke.id) ? 'Remove from collection' : 'Save to collection'"
      >
        <span 
          class="heart-icon"
          :class="{ 'heart-filled': isJokeSaved(joke.id) }"
        >
          {{ isJokeSaved(joke.id) ? '❤️' : '🤍' }}
        </span>
      </button>
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
        <button
          v-if="!showPunchline"
          @click="revealPunchline"
          class="btn-primary"
        >
          Show Punchline
        </button>
        
        <button
          v-else
          @click="hidePunchline"
          class="btn-secondary"
        >
          Hide Punchline
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Joke } from '@/types'
import { useJokeCollection } from '@/composables/useJokeCollection'

interface Props {
  joke: Joke
  isInCollection?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isInCollection: false
})

const { saveJoke, removeJoke, isJokeSaved } = useJokeCollection()

const showPunchline = ref(false)
const isSaving = ref(false)
const isRemoving = ref(false)
const messageType = ref<'success' | 'error'>('success')

const revealPunchline = () => {
  showPunchline.value = true
}

const hidePunchline = () => {
  showPunchline.value = false
}

const toggleSave = async () => {
  const isCurrentlySaved = isJokeSaved(props.joke.id)
  
  if (isCurrentlySaved) {
    // Remove from collection
    isRemoving.value = true
    
    try {
      const success = removeJoke(props.joke.id)
      if (success) {
        if (!props.isInCollection) {
          messageType.value = 'success'
        }
      } else {
        messageType.value = 'error'
      }
    } catch (error) {
      messageType.value = 'error'
      console.error('Error removing joke:', error)
    } finally {
      isRemoving.value = false
    }
  } else {
    // Add to collection
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
}
</script>