<template>
  <div>
    <div class="status-indicator" :class="getStatusClass(status)"></div>
    <p v-if="status !== null">Status: {{ status }}</p>
    <p v-else>Status: Unknown</p>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Number,
      default: null,
    },
  },
  methods: {
    getStatusClass(status) {
      if (status === 200) {
        return 'status-indicator--green';
      } else {
        return 'status-indicator--red';
      }
    },
  },
}
</script>

<style scoped>
.status-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.status-indicator--green {
  background-color: green;
}

.status-indicator--red {
  background-color: red;
}
</style>
