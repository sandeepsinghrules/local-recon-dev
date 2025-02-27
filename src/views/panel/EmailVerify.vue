<template>

</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  metaInfo: {
    title: 'Verify Email'
  },
  components: {
  },
  methods: {
      async proceedWithActivation() {
            let exploded = window.location.href.split("email/verify");
            let url = process.env.VUE_APP_API_ENDPOINT + "/email/verify" + exploded[1];

            try {
                await axios.get(url)
            }catch(e){
                console.log(e)
            }

            window.location = '/login?verified=true';
      }
  },
  created() {
      this.proceedWithActivation();
  }
}
</script>