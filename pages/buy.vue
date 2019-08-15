<template>
  <div>
    <Navbar />
    <div class="lg:px-16 lg:w-3/5 w-full mx-auto px-4 py-4">
      <div class="flex items-center mt-4">
        <img :src="product.productImage" :alt="product.name" class="rounded-sm w-24 h-21 mr-4" />
        <div class="flex flex-col">
          <h5>{{product.name}}</h5>
          <p>${{product.amount}}</p>
        </div>
      </div>

      <card
        class="stripe-card flex flex-col px-4 py-4 text-white mt-8 shadow-md"
        :class="{ complete }"
        stripe="pk_test_EnXfmCHj9yNkuufgye3A60iF0005TIYpYG"
        @change="complete = $event.complete"
      />

      <div class="flex items-center w-full">
        <button
          class="hover:shadow-lg shadow pay-with-stripe mt-4 px-4 py-1 rounded bg-black text-white"
          @click="pay"
          :class="{disabled:processing}"
        >Pay ${{product.amount}}</button>

        <img
          v-if="processing"
          class="w-12 h-12 mt-4"
          src="../assets/Images/Spinner-1s-200px.svg"
          alt="loading bar"
        />
      </div>
    </div>
    <!-- <button class="pay-with-stripe" @click="pay" :disabled="!complete">Pay with credit card</button> -->
  </div>
</template>

<script>
import { Card, createToken } from 'vue-stripe-elements-plus'
import Navbar from '~/components/Navbar'
const Swal = require('sweetalert2')
const axios = require('axios')
import https from 'https'

export default {
  props: ['amount', 'productId'],
  components: {
    Card,
    Navbar
  },
  middleware: 'auth',
  data() {
    return {
      complete: false,
      product: {},
      processing: false
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
        productId: this.product.productId
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
    // console.log(this.$route)
    this.product = this.$store.state.itemToBuy
  }
}
</script>

<style scoped>
.stripe-card {
  background-color: white;
  border-radius: 5px;
}
</style>