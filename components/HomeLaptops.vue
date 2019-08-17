<template>
  <div class="px-6 lg:px-16 py-6">
    <!-- <div class="flex justify-between items-center">
      <div class="flex">
        <p>${{priceRange}}</p>
        <input
          v-model="priceRange"
          type="range"
          min="200"
          max="6000"
          value="6000"
          class="ml-2 priceSlider"
          id="priceRange"
        />
      </div>
    </div>-->

    <div class="products text-gray-600">
      <Laptop
        :laptop="laptop"
        class="product bg-white rounded-lg"
        v-for="laptop in laptops.slice(0,12)"
        :key="laptop._id"
      ></Laptop>
    </div>
    <div class="mt-4 rounded">
      <nuxt-link to="/laptops" class="bg-gray-700 text-white px-6 py-2">>>></nuxt-link>
    </div>
  </div>
</template>

<script>
import Laptop from '~/components/Laptops/Laptop'
const Toast = require('../helpers/sweetAlertToaster')
const axios = require('axios')
import https from 'https'

export default {
  components: {
    Laptop
  },
  transition: {
    name: 'test',
    mode: 'out-in'
  },
  props: ['laptops'],
  // async asyncData({error}) {
  //   const agent = new https.Agent({
  //     rejectUnauthorized: false
  //   })
  // },
  data() {
    return {
      priceRange: '6000'
    }
  },
  methods: {
    async addItemToCart() {
      const result = await this.$store.dispatch('addToCart', this.laptop._id)
      if (result.data.error) {
        Toast.fire({
          type: 'error',
          title: result.data.errorLog
        })
      } else {
        this.$store.commit('addToCart', this.laptop._id)
        Toast.fire({
          type: 'success',
          title: result.data.message
        })
      }
    }
  }
}
</script>



