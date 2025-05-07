<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Composant Navbar -->
    <!-- <Navbar /> -->

    <div class="p-6 text-center">
      <h2 class="mb-4 text-2xl font-semibold">Compteur d'Incrémentation</h2>
      <p class="mb-2 text-3xl">{{ count }}</p>
      <button @click="increment" class="px-4 py-2 text-white transition bg-blue-500 rounded-md shadow-md hover:bg-blue-600"> Incrémenter</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'

// Déclaration d'un compteur réactif
const count = ref(0)

// Fonction d'incrémentation
const increment = () => {
  count.value++
}
</script>
