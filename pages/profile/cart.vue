<template>
  <div class="lg:pt-0 pt-8">
    <h5 class="font-bold text-2xl text-gray-600 mb-3">My Cart</h5>
    <div class="products text-gray-600">
      <div
        class="product bg-white rounded-lg"
        v-for="laptop in laptops.slice(0,8)"
        :key="laptop._id"
      >
        <div class="w-full h-64">
          <nuxt-link :to="{ path: '/laptop', query: { name: laptop.name,id:laptop._id }}">
            <img :src="laptop.productImages[0]" :alt="laptop.name" />
          </nuxt-link>
        </div>
        <div class="px-2 py-2 flex justify-between items-center">
          <div class="px-2 py-2">
            <h5>{{laptop.name}}</h5>
            <p>${{laptop.price}}</p>
          </div>
          <div class="product-action">
            <a
              href="#"
              @click="buyItem(laptop.price,laptop._id,laptop.name,laptop.productImages[0])"
            >
              <i class="fas fa-arrow-circle-right text-xl"></i>
            </a>
            <a class="cursor-pointer" @click="removeItemFromCart(laptop._id)">
              <i class="fas fa-times-circle text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
import https from 'https'
import Laptop from '~/components/Laptops/Laptop'

export default {
  components: {
    Laptop
  },
  middleware: 'auth',
  async asyncData({ store }) {
    const agent = new https.Agent({
      rejectUnauthorized: false
    })
    const data = await store.dispatch(
      'fetchCartItems',
      store.state.user.user._id
    )
    return { laptops: data.data }
  },
  data() {
    return {}
  },
  methods: {
    async removeItemFromCart(productIndex) {
      await this.$store.dispatch('removeFromCart', productIndex)
      // $nuxt.refresh()
      this.$forceUpdate()
      // await this.$store.dispatch('fetchCartItems')
    },
    buyItem(amount, productId, name, productImage) {
      this.$store.commit('buySingleItem', {
        amount,
        productId,
        name,
        productImage,
        type: 'Single'
      })
      this.$router.push('/buy')
    }
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
.product:hover .product-action {
  margin-right: 0;
  transition: all 0.4s;
}
.product img {
  transition: all 0.4s;
}

@media only screen and (max-width: 768px) {
  .products .product-action {
    margin-right: 4px;
    margin-top: -18px;
  }
  .products .product {
    grid-column: span 12;
  }
}
</style>



