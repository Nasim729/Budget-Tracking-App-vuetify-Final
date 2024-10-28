<template>
  <div class="balance-display">
    <p>Current Balance: {{ balance }} {{ currency }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  financialData: {
    type: Object,
    required: true,
  },
  currency: {
    type: String,
    default: 'USD'
  }
});

const balance = computed(() => props.financialData.income - props.financialData.expenses);

</script>

<style scoped>
.balance-display {
  position: fixed;
  top: 0;
  right: 0;
  background-color: #8B0000; /* Dark Red color */
  padding: 10px;
  z-index: 1000; /* Ensure it's on top */
  border-radius: 5px; /* Rounded corners */
  color: white; /* White text */
}
</style>
