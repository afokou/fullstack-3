import axios from 'axios'
const baseUrl = 'https://fullstack-3-nniziw.fly.dev/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = async newObject => {
  try {
    return await axios.post(baseUrl, newObject)
  } catch (error) {
    if (error.response && error.response.status === 409) {
      const existingPersonId = error.response.data.existingPersonId
      return await axios.put(`${baseUrl}/${existingPersonId}`, newObject)
    }
    throw error
  }
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const del = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll: getAll,
  create: create,
  update: update,
  delete: del
}
