<template>
  <v-container class="fill-height" fluid>
    <BalanceDisplay :financialData="financialData" />
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="mx-auto" elevation="10">
          <v-card-title class="headline">
            Home
            <v-spacer></v-spacer>
            <v-btn color="error" @click="logout">Logout</v-btn>
          </v-card-title>
          <v-card-text>
            <v-tabs v-model="tab">
              <v-tab value="transactions">Transactions</v-tab>
              <v-tab value="profile">Profile</v-tab>
              <v-tab value="friends">Friends</v-tab>
              <v-tab value="piechart">Pie Chart</v-tab>
              <v-tab value="help">Help</v-tab>
            </v-tabs>
            <v-window v-model="tab">
              <v-window-item value="transactions">
                <v-card flat>
                  <v-card-title>Transactions</v-card-title>
                  <v-card-text>
                    <div>
                      <p>Current Date: {{ currentDate }}</p>
                      <p>Current Balance: {{ balance }}</p>
                      <v-text-field v-model="newTransaction.amount" label="Amount" type="number" />
                      <v-text-field v-model="newTransaction.description" label="Description" />
                      <v-select :items="transactionTypes" v-model="newTransaction.type" label="Type" />
                      <v-btn color="primary" @click="addTransaction">Add Transaction</v-btn>
                      <div v-if="transactionHistory.length > 0">
                        <h3>Transaction History</h3>
                        <ul>
                          <li v-for="(transaction, index) in transactionHistory" :key="index">
                            {{ transaction.type }}: {{ transaction.amount }} - {{ transaction.description }} - {{ transaction.date }}
                            <v-btn color="error" @click="deleteTransaction(index)">Delete</v-btn>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-window-item>
              <v-window-item value="profile">
                <v-card flat>
                  <v-card-title>Profile</v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="userStore.email"
                            label="Email"
                            type="email"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-file-input label="Profile Picture" v-model="profilePicture" />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="monthlyIncome"
                            label="Monthly Income"
                            type="number"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="annualIncome"
                            label="Annual Income"
                            type="number"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="monthlyExpenses"
                            label="Monthly Expenses"
                            type="number"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="annualExpenses"
                            label="Annual Expenses"
                            type="number"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="currentPassword"
                            label="Current Password"
                            type="password"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="newPassword"
                            label="New Password"
                            type="password"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-btn class="mt-4" color="primary" @click="updateUser">Update</v-btn>
                    </v-form>
                    <div v-if="showSummary">
                      <h3>Profile Summary</h3>
                      <p>Monthly Income: {{ monthlyIncome }}</p>
                      <p>Annual Income: {{ annualIncome }}</p>
                      <p>Monthly Expenses: {{ monthlyExpenses }}</p>
                      <p>Annual Expenses: {{ annualExpenses }}</p>
                    </div>
                  </v-card-text>
                </v-card>
              </v-window-item>
              <v-window-item value="friends">
                <v-card flat>
                  <v-card-title>Friends</v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-text-field v-model="newFriend.name" label="Friend Name" />
                      <v-text-field v-model="newFriend.email" label="Friend Email" type="email" />
                      <v-btn color="primary" @click="addFriend">Add Friend</v-btn>
                    </v-form>
                    <v-list>
                      <v-list-item v-for="(friend, index) in friends" :key="friend.id">
                        <v-list-item-content>
                          <v-list-item-title>{{ friend.name }}</v-list-item-title>
                          <v-list-item-subtitle>{{ friend.email }}</v-list-item-subtitle>
                          <v-btn color="error" @click="deleteFriend(index)">Delete</v-btn>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                    <div>
                      <h3>Shared Transactions</h3>
                      <v-text-field v-model="sharedTransaction.amount" label="Amount" type="number" />
                      <v-select :items="transactionTypes" v-model="sharedTransaction.type" label="Type" />
                      <v-select :items="friendsOptions" v-model="sharedTransaction.friend" label="Friend" item-text="name" item-value="id" />
                      <v-btn color="primary" @click="addSharedTransaction">Add Shared Transaction</v-btn>
                      <ul v-if="sharedTransactions.length > 0">
                        <li v-for="(transaction, index) in sharedTransactions" :key="index">
                          {{ transaction.type }}: {{ transaction.amount }} with {{ transaction.friend.name }}
                          <v-btn color="primary" @click="settleUp(index)">Settle Up</v-btn>
                        </li>
                      </ul>
                    </div>
                  </v-card-text>
                </v-card>
              </v-window-item>
              <v-window-item value="piechart">
                <v-card flat>
                  <v-card-title>Pie Chart</v-card-title>
                  <v-card-text>
                    <PieChart :chartData="pieChartData" :chartOptions="pieChartOptions" />
                  </v-card-text>
                </v-card>
              </v-window-item>
              <v-window-item value="help">
                <v-card flat>
                  <v-card-title>Help</v-card-title>
                  <v-card-text>Help content goes here</v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, reactive, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import AnalyticsChart from '@/components/AnalyticsChart.vue';
import BalanceDisplay from '@/components/BalanceDisplay.vue';
import PieChart from '@/components/PieChart.vue';
import dayjs from 'dayjs';

const tab = ref('transactions');
const userStore = useUserStore();
const router = useRouter();

const friends = ref([]);
let dialog = ref(false);
let currentFriend = ref(null);

const sharedTransactions = ref([]);

const newFriend = ref({ name: '', email: '' });
const sharedTransaction = ref({ amount: 0, type: 'income', friend: null });

const updateUser = () => {
  showSummary = true;
  console.log('User data updated:', userStore.$state);
};

const logout = () => {
  userStore.setUser(null);
  router.push('/');
};

const newTransaction = ref({ amount: 0, type: 'income', description: '' });
const transactionTypes = ['income', 'expense'];
const transactionHistory = ref([]);

const financialData = reactive({
  income: 0,
  expenses: 0,
});

const profilePicture = ref(null);
const monthlyIncome = ref(0);
const annualIncome = ref(0);
const monthlyExpenses = ref(0);
const annualExpenses = ref(0);
const currentPassword = ref('');
const newPassword = ref('');
let showSummary = ref(false);

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Income',
      backgroundColor: '#42A5F5',
      data: [],
    },
    {
      label: 'Expenses',
      backgroundColor: '#FF6384',
      data: [],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'x',
});

const pieChartData = ref({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
    },
  ],
});

const pieChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

const addTransaction = () => {
  if (newTransaction.value.amount !== 0) {
    const transaction = { ...newTransaction.value, date: new Date() };
    transactionHistory.value.push(transaction);
    let amount = parseFloat(newTransaction.value.amount);
    if (isNaN(amount)) {
      alert('Please enter a valid number for the amount.');
      return;
    }
    if (newTransaction.value.type === 'income') {
      financialData.income += amount;
    } else {
      financialData.expenses += amount;
    }
    newTransaction.value.amount = 0;
    newTransaction.value.description = '';
    updateChartData();
    updatePieChartData();
  }
};

const deleteTransaction = (index) => {
  const transaction = transactionHistory.value[index];
  if (transaction.type === 'income') {
    financialData.income -= transaction.amount;
  } else {
    financialData.expenses -= transaction.amount;
  }
  transactionHistory.value.splice(index, 1);
  updateChartData();
  updatePieChartData();
};

const addFriend = () => {
  if (newFriend.value.name && newFriend.value.email) {
    const newFriendObj = { id: Date.now(), name: newFriend.value.name, email: newFriend.value.email };
    friends.value.push(newFriendObj);
    newFriend.value.name = '';
    newFriend.value.email = '';
    currentFriend = newFriendObj;
    dialog = true;
  }
};

const deleteFriend = (index) => {
  friends.value.splice(index, 1);
};

const addSharedTransaction = () => {
  if (sharedTransaction.value.amount !== 0 && sharedTransaction.value.friend) {
    const friend = friends.value.find(f => f.id === sharedTransaction.value.friend);
    sharedTransactions.value.push({ ...sharedTransaction.value, date: new Date(), friend: friend });
    sharedTransaction.value.amount = 0;
    sharedTransaction.value.friend = null;
    dialog = false;
  }
};

const settleUp = (index) => {
  sharedTransactions.value.splice(index, 1);
};


const balance = computed(() => financialData.income - financialData.expenses);
financialData.income = financialData.income || 0;
financialData.expenses = financialData.expenses || 0;

const currentDate = computed(() => dayjs().format('MMMM D, YYYY'));

const currentMonthIncome = computed(() => {
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-indexed month
  return transactionHistory.value.reduce((sum, transaction) => {
    const transactionDate = new Date(transaction.date);
    if (transaction.type === 'income' && transactionDate.getMonth() === currentMonth) {
      return sum + parseFloat(transaction.amount);
    }
    return sum;
  }, 0);
});

const currentMonthExpenses = computed(() => {
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-indexed month
  return transactionHistory.value.reduce((sum, transaction) => {
    const transactionDate = new Date(transaction.date);
    if (transaction.type === 'expense' && transactionDate.getMonth() === currentMonth) {
      return sum + parseFloat(transaction.amount);
    }
    return sum;
  }, 0);
});


const updateChartData = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const incomeData = transactionHistory.value.reduce((acc, transaction) => {
    const transactionDate = new Date(transaction.date);
    if (transaction.type === 'income' && transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
      acc.push(parseFloat(transaction.amount));
    }
    return acc;
  }, []);

  const expenseData = transactionHistory.value.reduce((acc, transaction) => {
    const transactionDate = new Date(transaction.date);
    if (transaction.type === 'expense' && transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
      acc.push(parseFloat(transaction.amount));
    }
    return acc;
  }, []);

  chartData.value.labels = ['Income', 'Expenses'];
  chartData.value.datasets[0].data = incomeData.length > 0 ? [incomeData.reduce((a, b) => a + b, 0)] : [0];
  chartData.value.datasets[1].data = expenseData.length > 0 ? [expenseData.reduce((a, b) => a + b, 0)] : [0];
  chartData.value.datasets[0].backgroundColor = '#42A5F5';
  chartData.value.datasets[1].backgroundColor = '#FF6384';
  chartData.value.datasets[0].label = 'Income';
  chartData.value.datasets[1].label = 'Expenses';

  nextTick(() => {
    console.log('Chart data updated:', chartData.value);
  });
};

watch(transactionHistory, updateChartData, { immediate: true });

const friendsOptions = computed(() => friends.value);

const updatePieChartData = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const incomeData = transactionHistory.value.reduce((acc, transaction) => {
    const transactionDate = new Date(transaction.date);
    if (transaction.type === 'income' && transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
      acc += parseFloat(transaction.amount);
    }
    return acc;
  }, 0);

  const expenseData = transactionHistory.value.reduce((acc, transaction) => {
    const transactionDate = new Date(transaction.date);
    if (transaction.type === 'expense' && transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
      acc += parseFloat(transaction.amount);
    }
    return acc;
  }, 0);

  pieChartData.value.labels = ['Income', 'Expenses'];
  pieChartData.value.datasets[0].data = [incomeData, expenseData];
  pieChartData.value.datasets[0].backgroundColor = ['#42A5F5', '#FF6384'];
  nextTick(() => {
    console.log('Pie chart data updated:', pieChartData.value);
  });
};

watch(transactionHistory, updatePieChartData, { immediate: true });

</script>

<style scoped>
.fill-height {
  height: 100vh;
}
.v-card {
  background-color: #f5f5f5;
}
</style>
