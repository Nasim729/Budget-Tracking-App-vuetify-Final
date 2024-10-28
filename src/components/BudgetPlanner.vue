<template>
  <v-card>
    <v-card-text>
      <div>
        <h3>Income Plans</h3>
        <v-text-field v-model="newIncomePlan.description" label="Description"/>
        <v-text-field v-model="newIncomePlan.amount" label="Amount" type="number" />
        <v-text-field v-model="newIncomePlan.date" label="Date" type="text"/>
      </div>
      <div>
        <h3>Expense Plans</h3>
        <v-text-field v-model="newExpensePlan.description" label="Description"/>
        <v-text-field v-model="newExpensePlan.amount" label="Amount" type="number" />
        <v-text-field v-model="newExpensePlan.date" label="Date" type="text"/>
      </div>
      <v-btn color="primary" @click="addPlan">Add Plan</v-btn>
      <div v-if="plans.length > 0">
        <h3>Plan Summary</h3>
        <ul>
          <li v-for="(plan, index) in plans" :key="index">
            <span v-if="plan.type === 'income'">Income: </span>
            <span v-else-if="plan.type === 'expense'">Expense: </span>
            <span v-else>Plan: </span>
            {{ plan.description }} - {{ plan.amount }} - {{ plan.date }}
            <v-btn color="error" @click="deletePlan(index)">Delete</v-btn>
          </li>
        </ul>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      newIncomePlan: { description: '', date: '', amount: 0 },
      newExpensePlan: { description: '', date: '', amount: 0 },
      plans: []
    };
  },
  methods: {
    addPlan() {
      if (this.newIncomePlan.description) {
        this.plans.push({...this.newIncomePlan, type: 'income'});
      }
      if (this.newExpensePlan.description) {
        this.plans.push({...this.newExpensePlan, type: 'expense'});
      }
      this.newIncomePlan = { description: '', date: '', amount: 0 };
      this.newExpensePlan = { description: '', date: '', amount: 0 };
    },
    deletePlan(index) {
      this.plans.splice(index, 1);
    }
  }
};
</script>
