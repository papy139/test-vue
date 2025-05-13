<script setup>
import { ref, VueElement } from 'vue'

const donnee = ref([])

const onSubmit = () => {
    donnee.value.push({ nom: nom.value, prenom: prenom.value, adresse: adresse.value, age: age.value })
}
</script>

<template>
    <div>
        <form @submit.prevent="onSubmit">
            <div>
                <label for="nom">Nom:</label>
                <input v-model="nom" type="text" id="nom" placeholder="Votre nom" required />

                <label for="prenom">Prénom:</label>
                <input v-model="prenom" type="text" id="prenom" placeholder="Votre prénom" required />

                <label for="adresse">Adresse:</label>
                <input v-model="adresse" type="text" id="adresse" placeholder="Votre adresse" />

                <label for="age">Age :</label>
                <input v-model="age" type="text" id="age" placeholder="Votre âge" required />
                <button type="submit">Envoyer</button>
            </div>
        </form>
        Rendue : {{ donnee }}
    </div>
</template>

<style setup>
input {
    border: 3px;
}
</style>
