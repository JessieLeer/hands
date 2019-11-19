import axios from "axios"
import store from '../store'

const service = axios.create({
	baseURL: process.env.BASE_URL,
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    config.headers = {
		  'token': store.state.user.token,
			'user': store.state.user.username
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default service