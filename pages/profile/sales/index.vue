<template>
  <div>
    <div class="lg:flex lg:flex-row flex-col justify-between items-start mb-4 lg:pt-0 pt-8">
      <h5 class="font-bold lg:text-2xl text-xl text-gray-600">My Items on Sale</h5>
      <nuxt-link to="/profile/sales/add">
        <button
          class="mt-3 lg:mt-0 bg-blue-400 hover:bg-blue-500 lg:px-6 px-2 py-2 rounded text-white"
        >Sell an Item</button>
      </nuxt-link>
    </div>
    <div class="products text-gray-600">
      <div class="product bg-white rounded-lg" v-for="product in products" :key="product._id">
        <div class="w-full h-64">
          <nuxt-link :to="{ path: '/laptop', query: { name: product.name,id:product._id }}">
            <img :src="product.productImages[0]" :alt="product.name" />
          </nuxt-link>
        </div>
        <div class="px-2 py-2 flex justify-between items-center">
          <div>
            <h5>{{product.name}}</h5>
            <p>${{product.price}}</p>
          </div>
          <div class="product-action">
            <nuxt-link
              :to="{ path: '/profile/sales/edit', query: { name: product.name,id:product._id }}"
              href="#"
              class="ml-2"
            >
              <i class="fas fa-edit text-xl text-blue-400"></i>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import https from 'https'
const axios = require('axios')

export default {
  async asyncData({ store }) {
    const agent = new https.Agent({
      rejectUnauthorized: false
    })
    // console.log(store.state.user.user._id)
    const products = await axios.get(
      `${process.env.baseUrl}/user/sales/${store.state.user.user._id}`,
      { httpsAgent: agent }
    )
    return {
      products: products.data.products
    }
  },
  data() {
    return {
      products: []
    }
  },
  methods: {
    // editSaleItem() {
    // this.$router.push('/profile/sales/edit/acer')
    // }
  }
}
</script>


<style>
.product-action {
  margin-right: -6rem;
  transition: all 0.4s;
}
.product-action a {
  outline: none;
}
.product {
  grid-column: span 4;
}
.product:hover .product-action {
  margin-right: 0;
  transition: all 0.4s;
}
.product img {
  transition: all 0.4s;
}
</style>

