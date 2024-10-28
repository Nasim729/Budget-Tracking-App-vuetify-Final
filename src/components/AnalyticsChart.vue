<template>
  <div>
    <canvas ref="chartCanvas" />
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  props: {
    income: {
      type: Number,
      required: true
    },
    expenses: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const chartCanvas = ref(null);
    let chartInstance = null;

    onMounted(() => {
      const ctx = chartCanvas.value.getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Income', 'Expenses'],
          datasets: [
            {
              label: 'Amount',
              data: [props.income, props.expenses],
              backgroundColor: ['#42A5F5', '#FF6384'], // Blue for income, red for expenses
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });

    watch(() => [props.income, props.expenses], () => {
      if (chartInstance) {
        chartInstance.data.datasets[0].data = [props.income, props.expenses];
        chartInstance.update();
      }
    });

    return { chartCanvas };
  }
};
</script>
