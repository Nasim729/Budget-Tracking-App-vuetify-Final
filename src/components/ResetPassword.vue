<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Reset Password</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="newPassword"
                label="New Password"
                type="password"
                required
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
                required
              ></v-text-field>
              <v-btn color="primary" @click="resetPassword">Reset Password</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const router = useRouter();

const resetPassword = () => {
  if (newPassword.value === confirmPassword.value) {
    // Placeholder for password reset logic
    alert('Password reset successful!');
    router.push('/');
  } else {
    alert('Passwords do not match.');
  }
};
</script>
