import axios from '../../../plugins/api/axios'

export default {
    // index( params ){

    // },

    get( id ){
        return axios.get('businesses/get/' + id);
    },

    getReviews( id, sortBy, sortDesc, page, itemsPerPage, search, filter_rating, filter_website ){
        return axios.get('businesses/get-reviews/' + id + "?sortBy=" + sortBy  + 
                            "&sortDesc=" + sortDesc +
                            "&page=" + page  +
                            "&itemsPerPage=" + itemsPerPage +
                            "&search=" + search +
                            "&filter_rating=" + filter_rating +
                            "&filter_website=" + filter_website );
    },

    // update( id, data ){
        
    // },

    create( attributes ){
        return axios.post('businesses/create', attributes);
    },

    // delete( id ){

    // }
}