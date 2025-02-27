import axios from '../../../plugins/api/axios'

export default {
    index( params ){
        return axios.get('listings', {
            headers: {
              'Authorization': 'Bearer ' + this.state.auth.jwt
            }
          });
    },

    get( id ){
        return axios.get('listings/get/' + id);
    },

    create( attributes ){
        return axios.post('listings/create', attributes);
    },

    delete( id ){
        return axios.delete('listings/delete', id);
    }
}