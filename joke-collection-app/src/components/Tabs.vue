<template>
    <div class="w-full">
        <!-- Tabs -->
        <div class="border-b border-gray-300 mb-8">
            <div>
                <nav class="flex justify-center" aria-label="Tabs">
                    <button @click="activeTab = 'discover'"
                        :class="['tab-button', { 'tab-button-active': activeTab === 'discover' }]">
                        Discover Jokes
                    </button>
                    <button @click="activeTab = 'collection'"
                        :class="['tab-button', { 'tab-button-active': activeTab === 'collection' }]">
                        My Collection
                    </button>
                </nav>
            </div>
        </div>

        <!-- Tabs Content -->
        <div>
            <!-- Discovery Tab -->
            <div v-if="activeTab === 'discover'">
                <JokeDiscovery />
            </div>

            <!-- Collection Tab -->
            <div v-else-if="activeTab === 'collection'">
                <div class="text-center">
                    <h3 class="text-xl text-black font-semibold mb-2">Your Collection</h3>
                    <p class="text-md text-black">Save your favorite jokes</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import JokeDiscovery from './jokes/JokeDiscovery.vue'

const activeTab = ref<'discover' | 'collection'>('discover')
</script>