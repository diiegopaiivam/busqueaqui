import axios from 'axios'

const api = axios.create({
    baseURL: 'http://apibusqueaqui.devce.com.br/public/'
});

export default api;