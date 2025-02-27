import store from './../store'; // path to your Vuex store

// plugins/global.js
// these functions can be used without importing
export default {
    getWebsiteName() {
        console.log(this.$store)
        return 'foo';
    }
};