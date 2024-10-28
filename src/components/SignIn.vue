<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Sign In</v-card-title>
          <v-card-text>
            <v-form>
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
              <v-checkbox
                v-model="agree"
                label="I agree to the terms and conditions"
                required
              ></v-checkbox>
              <v-btn color="primary" @click="signIn">Sign In</v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="signUp">Sign Up</v-btn>
            <v-btn text @click="forgotPassword">Forgot Password?</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const email = ref('');
const password = ref('');
const agree = ref(false);
const router = useRouter();
const userStore = useUserStore();

const signIn = () => {
  if (agree.value) {
    const user = userStore.users.find(
      user => user.email === email.value && user.password === password.value
    );
    if (user) {
      userStore.setUser(user);
      router.push('/home');
    } else {
      alert('Invalid email or password.');
    }
  } else {
    alert('You must agree to the terms and conditions.');
  }
};

const signUp = () => {
  router.push('/signup');
};

const forgotPassword = () => {
  router.push('/reset-password');
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
