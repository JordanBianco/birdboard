import axios from 'axios'
import store from '@/store'

const api = axios.create({
	// baseURL: 'http://localhost:8000/api'
	baseURL: 'https://birdboardapp.herokuapp.com/api'
})

api.interceptors.request.use(function(config) {
	const token = store.state.auth.token
	if(token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}, function(err) {
	return Promise.reject(err);
});

export default api