import https from 'https'
const axios = require('axios')

export default axios.create({
  baseURL: process.env.baseURL
})
