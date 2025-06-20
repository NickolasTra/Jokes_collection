<template>
  <div class="bg-white rounded-lg shadow-lg p-6 mx-auto w-5/6 h-56 flex flex-col">
    <!-- Joke Type Badge -->
    <div class="mb-4">
      <span class="px-2 py-1 rounded-lg text-xs font-semibold bg-blue-600 text-white uppercase">
        {{ joke.type }}
      </span>
    </div>
    
    <!-- Joke Setup -->
    <div class="mb-4">
      <p class="text-lg font-medium text-black">
        {{ joke.setup }}
      </p>
    </div>
    
    <!-- Punchline Section -->
    <div class="space-y-3">
      <div class="h-12 flex items-center">
        <div v-if="showPunchline" class="transition-all duration-300 ease-in-out w-full">
          <p class="text-gray-700 italic">
            {{ joke.punchline }}
          </p>
        </div>
      </div>
      
      <button
        v-if="!showPunchline"
        @click="revealPunchline"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
      >
        Show Punchline
      </button>
      
      <button
        v-else
        @click="hidePunchline"
        class="w-full bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded-lg transition-colors duration-200"
      >
        Hide Punchline
      </button>
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