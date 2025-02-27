<template>

  <div v-if="showModal" @click.self="hide" class="fixed top-0 left-0 h-full w-full z-50 flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2);">
    <div class="w-full sm:w-1/2 lg:w-2/5 bg-white rounded-lg mx-6">

      <div class="p-6">

        <h2 class="text-lg font-semibold text-gray-800 mb-3">Upload CSV File</h2>

        <hr class="border-b border-gray-100 mb-4">

        <div v-if="success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          {{success}}
        </div>

        <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          {{error}}
        </div>

        <div class="mb-6">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            File
          </label>
          <input name="csv" ref="file" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="file">
        </div>

        <p class="text-xs text-gray-700 mb-4">Your CSV file should be in the following format. Please make sure Header and Fields match.</p>

        <table class="border">
          <thead class="bg-gray-200">
            <tr class="">
              <th class="text-left text-xs p-1">First</th>
              <th class="text-left text-xs p-1">Last</th>
              <th class="text-left text-xs p-1">Email</th>
              <th class="text-left text-xs p-1">Phone</th>
              <th class="text-left text-xs p-1">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left text-xs p-1 text-gray-700 pr-4">Brian</td>
              <td class="text-left text-xs p-1 text-gray-700 pr-4">Adams</td>
              <td class="text-left text-xs p-1 text-gray-700 pr-4">info1@example.com</td>
              <td class="text-left text-xs p-1 text-gray-700 pr-4">+123456781</td>
              <td class="text-left text-xs p-1 text-gray-700">2019-03-25 12:00:00 </td>
            </tr>
            <tr class="bg-gray-100">
              <td class="text-left text-xs p-1 text-gray-700 pr-4">David</td>
              <td class="text-left text-xs p-1 text-gray-700 pr-4"></td>
              <td class="text-left text-xs p-1 text-gray-700 pr-4">info2@example.com</td>
              <td class="text-left text-xs p-1 text-gray-700 pr-4"></td>
              <td class="text-left text-xs p-1 text-gray-700"></td>
            </tr>
            <tr>
              <td class="text-left text-xs p-1 text-gray-700 pr-4"></td>
              <td class="text-left text-xs p-1 text-gray-700 pr-4"></td>
              <td class="text-left text-xs p-1 text-gray-700 pr-4"></td>
              <td class="text-left text-xs p-1 text-gray-700 pr-4">+123456783</td>
              <td class="text-left text-xs p-1 text-gray-700">2019-04-22 12:00:00</td>
            </tr>
            <tr class="bg-gray-100">
              <td class="text-left text-xs p-1 text-gray-700 pr-4"></td>
              <td class="text-left text-xs p-1 text-gray-700 pr-4"></td>
              <td class="text-left text-xs p-1 text-gray-700 pr-4">info4@example.com</td>
              <td class="text-left text-xs p-1 text-gray-700 pr-4">+123456784</td>
              <td class="text-left text-xs p-1 text-gray-700">2019-05-22 12:00:00</td>
            </tr>
          </tbody>
        </table>

      </div>

      <div class="bg-gray-100 rounded-b-lg px-6 py-4">

        <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="hide">
            Cancel
        </button>

        <button class="rg-dialog-button-save rounded bg-gray-500 hover:bg-gray-600 text-white focus:outline-none py-2 px-4" :class="{'spinner': uploading}" @click="upload">
            Upload
        </button>

      </div>



    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data: function() {
    return {
      showModal: false,
      uploading: false,
      success: null,
      error: null
    }
  },
  methods: {
    show() {
      this.showModal = true
    },
    hide() {
      this.showModal = false
      this.uploading = false
    },
    async upload() {
      this.uploading = true
      this.error = null
      try {

        let formData = new FormData();
        formData.append("csv", this.$refs.file.files[0]);
        await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/provider/csv_file/upload`, formData, {
            headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt,
              'Content-Type': 'multipart/form-data'
            }
        })

        //this.hide()
        this.$router.push('/provider/csv_file/success')
      } catch (e) {
        this.error = e.response.data.message
      }
      this.uploading = false
    }
  }
}
</script>
