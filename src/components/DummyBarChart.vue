<template>
  <div>
    <canvas ref="chartCanvas" />
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  props: {
    income: {
      type: Number,
      default: 0
    },
    expenses: {
      type: Number,
      default: 0
    }
  },
  watch: {
    income: {
      handler: function(newValue) {
        this.updateChart();
      },
      deep: true
    },
    expenses: {
      handler: function(newValue) {
        this.updateChart();
      },
      deep: true
    }
  },
  mounted() {
    this.updateChart();
  },
  methods: {
    updateChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Income', 'Expenses'],
          datasets: [{
            label: 'Income',
            data: [this.income],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }, {
            label: 'Expenses',
            data: [this.expenses],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  },
  data() {
    return {
      chart: null
    };
  }
};
</script>
