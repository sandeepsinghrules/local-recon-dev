<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
    <div class="w-full sm:w-1/2 lg:w-2/5 bg-white rounded-lg mx-6">

      <div class="p-6">

        <h2 class="text-lg font-semibold text-gray-800 mb-3">Copy link to form</h2>

        <hr class="border-b border-gray-100 mb-4">

        <div v-if="success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          {{success}}
        </div>

        <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <div v-html="error"></div>
        </div>

        <div class="mb-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            Link
          </label>
          <input name="link" ref="link" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text"
            :value="getExternalContactFormLink()"
          >
        </div>

        <div id="qr-code-wrapper" class="mb-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            QR Code
          </label>
          
          <div id="qrcode"></div>

          <a href="javascript: void(0);" @click="downloadQrCode();" class="mt-3" style="font-size: 13px;">Download JPEG</a>
        </div>

      </div>

      <div class="bg-gray-100 rounded-b-lg px-6 py-4">

        <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="hide">
            Close
        </button>

        <button class="rg-dialog-button-save rounded bg-gray-500 hover:bg-gray-600 text-white focus:outline-none py-2 px-4" :class="{'spinner': saving}"
            v-clipboard:copy="getExternalContactFormLink()"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
        >
            Copy Link
        </button>
      </div>



    </div>
  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data: function() {
    return {
      showModal: false,
      saving: false,
      success: null,
      error: null,
      qrc: null
    }
  },
  methods: {
    show() {
      let self = this
      this.showModal = true

      if (!this.qrc) {
        setTimeout(function() {
          this.qrc = new QRCode(document.getElementById("qrcode"), self.getExternalContactFormLink());
        }, 200);
      }
    },
    hide() {
      this.showModal = false
      this.saving = false
    },
	onCopy: function (e) {
		this.$swal({
			title: "Copied",
			text: "Link copied successfully!",
			showCancelButton: false,
			});
	},
	onError: function (e) {
		alert('Failed to copy the link to the clipboard')
		console.log(e);
	},
    copy() {
      
    },
    getExternalContactFormLink() {
        let url = window.location.origin + "/add-contact/" + this.$store.state.me.me.uuid

        return url;
    },

    downloadQrCode() {
      let img = document.querySelector("#qr-code-wrapper img");
      let imgSrc = img.src;

      // window.location.href = 'data:application/octet-stream;base64,' + img;
      window.location.href = imgSrc;

      var a = document.createElement("a"); //Create <a>
      // a.href = "data:image/png;base64," + ImageBase64; //Image Base64 Goes here
      a.href = imgSrc //Image Base64 Goes here
      a.download = "QrCode.jpeg"; //File name Here
      a.click(); //Downloaded file
    }
  },

  mounted() {

  }
}
</script>
