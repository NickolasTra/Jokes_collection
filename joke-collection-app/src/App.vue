<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>