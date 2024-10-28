<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Sign Up</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="name"
                label="Name"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
                required
              ></v-text-field>
              <v-alert v-if="error" type="error">{{ error }}</v-alert>
              <v-btn color="primary" @click="signUp">Sign Up</v-btn>
              <v-btn text @click="goBack">Back</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useUserStore} from '@/stores/user';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const router = useRouter();
const userStore = useUserStore();

const signUp = () => {
  if (password.value === confirmPassword.value) {
    userStore.addUser({
      name: name.value,
      email: email.value,
      password: password.value,
      birthdate: '',
      balance: 0,
      income: 0,
      expenses: 0,
    });
    router.push('/home');
  } else {
    error.value = 'Passwords do not match.';
  }
};

const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
