import axios from 'axios'

const instance = axios.create({
  timeout: 5000
})

export const get = async (url) => {
  try {
    console.log('GET request:', url); // Add this line
    const response = await instance.get(url)
    return response.data
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`)
  }
}

export const loadServers = async () => {
  try {
    console.log('Loading servers...'); // Add this line
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
        console.log('Getting status for:', server.url); // Add this line
        const response = await get(server.url)
        const status = {
          name: server.name,
          status: response.status
        }
        statuses.push(status)
      } catch (error) {
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
