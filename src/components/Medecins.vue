<script setup>
import { ref, onMounted, watch } from 'vue'
import api from '../api/api.js'

const medecins = ref([])
const nomRecherche = ref('')
const messageErreur = ref('')
const loading = ref(false)
const affichageListe = ref(false)
const rechercheEnCours = ref(false)
const animationClasse = ref('')
const animationMessage = ref('')

// Fonction pour animer l'apparition des médecins
const animationApparition = () => {
    animationClasse.value = 'transition-opacity duration-500 ease-in opacity-0'
    setTimeout(() => {
        animationClasse.value = 'transition-opacity duration-500 ease-in opacity-100'
    }, 50)
}

// Fonction pour afficher les notifications
const notifier = (message, type = 'error') => {
    messageErreur.value = message
    animationMessage.value = type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
    setTimeout(() => (messageErreur.value = ''), 3000)
}

// Fonction pour récupérer les médecins
const fetchMedecins = async () => {
    loading.value = true
    rechercheEnCours.value = true
    try {
        const response = await api.get('/medecins', { params: { nom: nomRecherche.value } })
        medecins.value = Array.isArray(response.data) ? response.data : []
        if (medecins.value.length === 0) {
            notifier('Aucun médecin trouvé.', 'error')
        } else {
            notifier('Médecins chargés avec succès.', 'success')
            animationApparition()
        }
        affichageListe.value = medecins.value.length > 0
    } catch (error) {
        notifier('Erreur lors de la récupération des médecins.', 'error')
    } finally {
        loading.value = false
        rechercheEnCours.value = false
    }
}

onMounted(fetchMedecins)

watch(nomRecherche, () => {
    if (nomRecherche.value.length > 2 || nomRecherche.value.length === 0) {
        fetchMedecins()
    }
})
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 p-8">
        <h2 class="mb-6 animate-bounce text-center text-3xl font-extrabold text-gray-800">
            Liste des Médecins
        </h2>

        <!-- Notifications dynamiques -->
        <div v-if="messageErreur" :class="`mb-4 rounded-lg p-4 text-center ${animationMessage}`">
            {{ messageErreur }}
        </div>

        <!-- Champ de recherche -->
        <div class="relative mx-auto mb-6 w-full max-w-lg">
            <input
                v-model="nomRecherche"
                placeholder="Rechercher un médecin..."
                class="w-full rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div v-if="rechercheEnCours" class="absolute right-3 top-2 animate-spin text-gray-500">⏳</div>
        </div>

        <!-- Liste des médecins -->
        <div v-if="loading" class="mb-4 text-center text-xl text-gray-600">Chargement...</div>
        <transition-group name="fade" tag="ul" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <li
                v-for="medecin in medecins"
                :key="medecin.id"
                :class="`transform rounded-lg bg-white p-4 shadow-lg hover:scale-105 hover:bg-blue-100 ${animationClasse}`"
            >
                <h3 class="text-lg font-semibold">{{ medecin.nom }} {{ medecin.prenom }}</h3>
                <p class="text-gray-600">{{ medecin.specialitecomplementaire }}</p>
                <p class="text-gray-500">{{ medecin.ville }}</p>
                <div class="mt-1 text-xs text-gray-400">ID: {{ medecin.id }}</div>
            </li>
        </transition-group>
    </div>
</template>

<style>
@keyframes bounce {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
