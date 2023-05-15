import axios from 'axios'

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000
})

export const get = async (url) => {
  try {
    const response = await instance.get(url)
    return response.data
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`)
  }
}

export const loadServers = async () => {
  try {
    const response = await instance.get('/servers.json')
    return response.data
  } catch (error) {
    throw new Error(`Failed to load servers: ${error.message}`)
  }
}

export const getStatuses = async () => {
  try {
    const servers = await loadServers()
    const statuses = []

    for (const server of servers) {
      try {
        const response = await get(server.url)
        const status = {
          name: server.name,
          status: response.status
         
        }
        statuses.push(status)
      } catch (error) {
        console.error(`Failed to get status for server "${server.name}": ${error.message}`)
        const status = {
          name: server.name,
          status: 500
        }
        statuses.push(status)

      }
    }

    return statuses
  } catch (error) {
    throw new Error(`Failed to get statuses: ${error.message}`)
  }
}

export default {
  get,
  loadServers,
  getStatuses
}
