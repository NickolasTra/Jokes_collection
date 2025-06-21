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
                        <span v-if="totalJokes > 0" class="collection-count">
                            {{ totalJokes }}
                        </span>
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
                <JokeCollection />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import JokeDiscovery from './jokes/JokeDiscovery.vue'
import JokeCollection from './jokes/JokeCollection.vue'
import { useJokeCollection } from '@/composables/useJokeCollection'

const activeTab = ref<'discover' | 'collection'>('discover')
const { collectionStats } = useJokeCollection()

const totalJokes = computed(() => collectionStats.value.totalJokes || 0)
</script>