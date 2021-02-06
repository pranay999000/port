import axios from 'axios'

export default axios.create({
    baseURL: 'https://port-1ee7b-default-rtdb.firebaseio.com/'
})