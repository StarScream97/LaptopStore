<template>
  <div class="w-1/3 lg:px-8 lg:py-6 p-4 bg-gray-300 shadow-lg text-gray-800 h-56">
    <no-ssr>
      <card
        class="stripe-card flex flex-col px-4 py-4"
        :class="{ complete }"
        stripe="pk_test_EnXfmCHj9yNkuufgye3A60iF0005TIYpYG"
        @change="complete = $event.complete"
      />
    </no-ssr>
    <h5 class="mt-4 ml-4">${{details.amount}}</h5>
    <div class="flex items-center w-full">
      <button
        class="ml-4 pay-with-stripe mt-4 px-4 py-1 rounded bg-black text-white"
        @click="pay"
        :class="{disabled:processing}"
      >Pay</button>

      <img
        v-if="processing"
        class="w-12 h-12 mt-4"
        src="../assets/Images/Spinner-1s-200px.svg"
        alt="loading bar"
      />
    </div>
  </div>
</template>

<script>
import { Card, createToken } from 'vue-stripe-elements-plus'
const axios = require('axios')
import https from 'https'

const Swal = require('sweetalert2')
// import 'sweetalert2/src/sweetalert2.scss'

export default {
  props: ['details'],
  components: {
    Card
  },
  data() {
    return {
      processing: false,
      complete: false
      //   amount: '200'
    }
  },
  methods: {
    async pay() {
      this.processing = true
      const data = await createToken()
      const purchaseData = {
        userId: this.$store.state.user.user._id,
        cardId: data.token.card.id,
        source: data.token.id,
        productId: this.details.productId
      }
      const result = await this.$store.dispatch('buyItem', purchaseData)
      this.processing = false
      if (result.data.error) {
        Swal.fire('Oops!', result.data.errorLog, 'error')
      } else {
        Swal.fire('Success', 'Purchase Successful!', 'success')
        this.$store.commit('addNewPurchase', result.data)
        this.$router.push('/profile/purchases')
      }
    }
  },
  created() {
    console.log(this.details)
  }
}
</script>

<style scoped>
.stripe-card {
  color: black !important;
}
.disabled {
  pointer-events: none;
  background-color: black;
}
</style>