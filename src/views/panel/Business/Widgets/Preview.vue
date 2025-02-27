<template>
    <div>
        <object id="regro-preview-url" v-if="url" :data="url"></object>
    </div>
</template>

<script>

export default {
    data () {
        return {
            url: null
        }
    },
    created() {
        let self = this
        setTimeout(function() {
            let url = ((process.env.NODE_ENV == 'development') ? "http://localhost:8000" : "https://" + window.location.host) + "/js/v1/embed.js?token=" + self.$route.params.token;
            
            // Dev
            if (process.env.NODE_ENV == 'development') {
                url = url + "&env=dev";
            }

            // Preview
            let exploded = window.location.href.split("?fw=");
            if (exploded.length > 1) {
                let exploded2 = exploded[1].split("&url=");
                url = url + "&fw=" + exploded2[0];

                if (exploded2.length > 1) {
                    console.log('avem URL');
                    self.url = decodeURIComponent(exploded2[1]);
                }
            }

            console.log('url', url)

            let embedWidgetScript = document.createElement('script')
            embedWidgetScript.setAttribute('src', url);
            // document.body.innerHTML = '';
            document.body.appendChild(embedWidgetScript);
        }, 1000);
    },
}
</script>

<style type="text/css">
    #regro-preview-url {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 0px;
    }
</style>