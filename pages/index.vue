<template>
  <div>
    <h1>Servers Status</h1>
    <div v-if="statuses">
      <div v-for="status in statuses" :key="status.name">
        <h3>{{ status.name }}</h3>
        <Status :status="status.status" />
      </div>
    </div>
    <div v-else>
      <p>No servers available.</p>
    </div>
  </div>
</template>

<script>
import { getStatuses } from '~/plugins/api.js'
import Status from '~/components/Status.vue'

export default {
  data() {
    return {
      statuses: null
    };
  },
  async created() {
    try {
      this.statuses = await getStatuses()
    } catch (error) {
      console.error(error)
    }
  },
  components: {
    Status,
  },
}
</script>
