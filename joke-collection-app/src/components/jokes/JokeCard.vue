<template>
  <div class="joke-card">
    <!-- Joke Type Badge -->
    <div class="mb-4">
      <span class="joke-badge">
        {{ joke.type }}
      </span>
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

interface Props {
  joke: Joke
}

defineProps<Props>()

const showPunchline = ref(false)

const revealPunchline = () => {
  showPunchline.value = true
}

const hidePunchline = () => {
  showPunchline.value = false
}
</script>