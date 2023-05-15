<template>
  <div>
    <h1>Servers Status</h1>
    <div v-if="servers">
      <div v-for="server in servers" :key="server.name">
        <h3>{{ server.name }}</h3>
        <Status :status="server.status" />
      </div>
    </div>
    <div v-else>
      <p>No servers available.</p>
    </div>
  </div>
</template>

<script>
import { loadServers } from '~/plugins/api.js'
import Status from '~/components/Status.vue'

export default {
  data() {
    return {
      servers: null,
    };
  },
  async created() {
    try {
      this.servers = await loadServers()
    } catch (error) {
      console.error(error)
    }
  },
  components: {
    Status,
  },
}
</script>
