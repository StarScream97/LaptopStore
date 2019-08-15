<template>
  <div class="product bg-white shadow-md">
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
      <div class="product-action" v-if="isLoggedIn">
        <a href="#" @click.prevent="addItemToCart()">
          <i class="fas fa-cart-plus text-xl"></i>
        </a>
        <!-- <a href="#" class="ml-2">
          <i class="far fa-heart text-xl"></i>
        </a>-->
      </div>
    </div>
  </div>
</template>

<script>
const Toast = require('../../helpers/sweetAlertToaster')
export default {
  props: ['laptop'],

  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn
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
  },
  created() {}
}
</script>

<style>
.product-action {
  margin-right: -6rem;
  transition: all 0.4s;
}
.product:hover .product-action {
  margin-right: 0;
  transition: all 0.4s;
}
.product img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s;
  cursor: pointer;
}
</style>

