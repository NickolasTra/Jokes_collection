<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <header class="bg-white shadow mb-8">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-900">
          😄 Joke Collection
        </h1>
      </div>
    </header>

    <div class="max-w-4xl mx-auto px-4">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>