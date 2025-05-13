<script setup>
import { ref, computed } from 'vue'

const products = ref([
    { id: 1, name: 'Pommes', emoji: '🍏', price: 8, quantity: 0 },
    { id: 2, name: 'Bananes', emoji: '🍌', price: 3, quantity: 0 },
    { id: 3, name: 'Noix de coco', emoji: '🥥', price: 22, quantity: 0 },
])

const totalAmount = computed(() => {
    return products.value.reduce((total, product) => total + product.price * product.quantity, 0)
})

const updateQuantity = (productId, delta) => {
    const product = products.value.find(p => p.id === productId)
    if (product) {
        const newQuantity = product.quantity + delta
        if (newQuantity >= 0) {
            product.quantity = newQuantity
        }
    }
}

const setQuantity = (productId, value) => {
    const product = products.value.find(p => p.id === productId)
    if (product) {
        const newQuantity = parseInt(value) || 0
        product.quantity = Math.max(0, newQuantity)
    }
}
</script>

<template>
    <div class="flex h-1/2 w-full items-center justify-center bg-gray-100">
        <div class="flex flex-col items-center space-y-4 rounded-xl bg-white p-6 shadow-lg">
            <div class="w-full text-center">
                <h1 class="text-3xl font-bold text-orange-700">VueMart</h1>
            </div>
            <div class="w-full rounded-lg bg-orange-600 p-4 text-white shadow-md">
                <h2 class="text-xl font-semibold">Panier</h2>
                <ul class="mt-2 space-y-2">
                    <li
                        v-for="product in products"
                        :key="product.id"
                        class="flex items-center justify-between"
                    >
                        <span>
                            {{ product.emoji }} {{ product.name }}:
                            <span v-if="product.price === 0">Gratuit</span>
                            <span v-else>{{ product.price * product.quantity }}€</span>
                        </span>
                        <div class="flex items-center space-x-2">
                            <button
                                @click="updateQuantity(product.id, -1)"
                                class="rounded bg-orange-700 px-2 py-1 text-white hover:bg-orange-800"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                :value="product.quantity"
                                @input="event => setQuantity(product.id, event.target.value)"
                                class="quantity-input"
                                min="0"
                            />
                            <button
                                @click="updateQuantity(product.id, 1)"
                                class="rounded bg-orange-700 px-2 py-1 text-white hover:bg-orange-800"
                            >
                                +
                            </button>
                        </div>
                    </li>
                </ul>
                <p class="p-2" v-if="totalAmount === 0">Il n'y a aucun article</p>
                <p v-else class="mt-4 rounded bg-orange-400 p-2 text-lg font-semibold">
                    Total: {{ totalAmount }}€
                </p>
            </div>
            <div class="w-full rounded-lg bg-gray-200 p-4 text-gray-800 shadow-md">
                <h2 class="mb-2 text-xl font-semibold">Horaires d'ouverture :</h2>
                <p>Dimanche: <u>10h - 16h</u></p>
                <p>Du lundi au vendredi: <u>9h - 17h</u></p>
                <p>Samedi: <u>09h30 - 18h00</u></p>
            </div>
        </div>
    </div>
</template>

<style>
.quantity-input {
    width: 4rem;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.9);
    color: #000;
    border: 1px solid #ea580c;
    border-radius: 0.25rem;
    padding: 0.25rem;
}

.quantity-input:focus {
    outline: none;
    border-color: #c2410c;
    box-shadow: 0 0 0 2px rgba(234, 88, 12, 0.2);
}

/* Masquer les flèches du input number */
.quantity-input::-webkit-inner-spin-button,
.quantity-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.quantity-input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>
