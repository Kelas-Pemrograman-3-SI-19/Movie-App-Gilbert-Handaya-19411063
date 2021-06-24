import Vue from 'vue'
import axios from 'axios'

const axiosIntance = axios.create({
  baseURL: 'http://localhost:3000/'
})

Vue.prototype.$axios = axiosIntance
