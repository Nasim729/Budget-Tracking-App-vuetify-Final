<template>
  <v-btn color="primary" @click="showAddTransactionDialog">Add Transaction</v-btn>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title>Add Transaction</v-card-title>
      <v-card-text>
        <v-text-field v-model="amount" label="Amount" type="number" />
        <v-text-field v-model="description" label="Description" />
        <v-select :items="transactionTypes" v-model="type" label="Type" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="addTransaction">Add</v-btn>
        <v-btn @click="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useUserStore } from '@/stores/user';

const emit = defineEmits(['update-chart-data']);
const userStore = useUserStore();
const dialog = ref(false);
const amount = ref(0);
const description = ref('');
const type = ref('income');
const transactionTypes = ['income', 'expense'];

const showAddTransactionDialog = () => {
  dialog.value = true;
};

const addTransaction = () => {
  if (amount.value !== 0) {
    const transaction = { amount: amount.value, description: description.value, type: type.value, date: new Date() };
    transactionHistory.value.push(transaction);
    if (transaction.type === 'income') {
      financialData.income += transaction.amount;
    } else {
      financialData.expenses += transaction.amount;
    }
    amount.value = 0;
    description.value = '';
    type.value = 'income';
    dialog.value = false;
    emit('update-chart-data');
  }
};

const transactionHistory = ref([]);
const financialData = ref({ income: 0, expenses: 0 });

</script>
