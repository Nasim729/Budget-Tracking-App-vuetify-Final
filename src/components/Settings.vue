<template>
  <v-card>
    <v-card-title>Settings</v-card-title>
    <v-card-text>
      <v-select label="Theme" :items="['light', 'dark']" v-model="selectedTheme" @change="changeTheme"/>
      <v-select label="Currency" :items="currencies" v-model="selectedCurrency" @change="changeCurrency"/>
    </v-card-text>
    <v-btn color="primary" @click="saveSettings">Save Settings</v-btn>
  </v-card>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      selectedTheme: localStorage.getItem('theme') || 'light',
      selectedCurrency: localStorage.getItem('currency') || 'USD',
      currencies: ['USD', 'EUR', 'GBP']
    };
  },
  methods: {
    changeTheme() {
      document.body.classList.toggle('dark-theme', this.selectedTheme === 'dark');
      localStorage.setItem('theme', this.selectedTheme);
    },
    changeCurrency() {
      localStorage.setItem('currency', this.selectedCurrency);
    },
    saveSettings() {
      localStorage.setItem('theme', this.selectedTheme);
      localStorage.setItem('currency', this.selectedCurrency);
      alert('Settings saved!');
    }
  }
};
</script>
