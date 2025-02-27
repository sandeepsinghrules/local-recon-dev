import axios from '../../../plugins/api/axios'

export default {
    register( params ){
        return axios.post('register', params);
    },
}